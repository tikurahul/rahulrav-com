## TensorRT and the Jetson Nano

This blog post is a continuation of my previous article on [Self Driving RC Cars](/blog/self_driving_radio_controlled_cars.html).

After setting up my RC car with a Jetson Nano i figured that I should go beyond the standard ML models. I wanted to try some Transfer learning based on `Resnet 18`. 

## Preliminary Benchmarks

The first step was going to be benchmarking the existing ML model to see how much headroom I had. `Resnet 18` was going to be a more complicated model and I needed to make sure that the Jetson Nano was capable enough.

The standard [Donkey Car](https://docs.donkeycar.com) model is based on the Nvidia [End to End Learning for Self-Driving Cars](https://arxiv.org/abs/1604.07316) paper. 

I was using a Camera resolution of `224px x 224px` and upon profiling my ML model I determined that the standard [Donkey Car](https://docs.donkeycar.com) model was doing inferences at the rate of **`25 Hz`** or about **`25` inferences per second**. It's important to remember that the RC car needs to do inferences at `20 Hz` at the very least for it to be capable of self-driving. I was currently `~5 Hz` faster than the required minimum. Not great.

## Performance Mode

The Jetson Nano is also capable of running in `performance` mode. To run a Nano in `performance` mode you need to run the following script. This script runs the Nano in maximum clock speed. I also set the fan to high given I had a [Noctua](https://www.newegg.com/noctua-nf-a4x20-5v-pwm-case-fan/p/1YF-000T-00094) fan installed. This would ensure that my Nano would not get thermal throttled.


```bash
#!/bin/bash
sleep 2
echo 'Maximum performance.'
sudo /usr/bin/jetson_clocks
sudo sh -c 'echo 255 > /sys/devices/pwm-fan/target_pwm'
```

Once I set the Nvidia Jetson to run in performance mode, my inference rate went up to **`40-42 Hz`**. Much better !

## Hello TensorRT

`TensorRT` is a framework from Nvidia for high-performance inference. The Nvidia Jetson Nano supports `TensorRT` via the `Jetpack` SDK. To make inferences faster, I realized that I was going to have to convert my `Keras` model to a `TensorRT` model.

### Freezing the Keras Model

The first step in converting a `Keras` model to a `TensorRT` model is freezing the model.

```python
'''
Usage:
    freeze_model.py --model="mymodel.h5" --output="frozen_model.pb"

Note:
    This requires that TensorRT is setup correctly. For more instructions, take a look at
    https://docs.nvidia.com/deeplearning/sdk/tensorrt-install-guide/index.html
'''
import os

from docopt import docopt
import json
from pathlib import Path
import tensorflow as tf

args = docopt(__doc__)
in_model = os.path.expanduser(args['--model'])
output = os.path.expanduser(args['--output'])
output_path = Path(output)
output_meta = Path('%s/%s.metadata' % (output_path.parent.as_posix(), output_path.stem))


# Reset session
tf.keras.backend.clear_session()
tf.keras.backend.set_learning_phase(0)

model = tf.keras.models.load_model(in_model, compile=False)
session = tf.keras.backend.get_session()

input_names = sorted([layer.op.name for layer in model.inputs])
output_names = sorted([layer.op.name for layer in model.outputs])

# Store additional information in metadata, useful when creating a TensorRT network
meta = {'input_names': input_names, 'output_names': output_names}

graph = session.graph

# Freeze Graph
with graph.as_default():
    # Convert variables to constants
    graph_frozen = tf.compat.v1.graph_util.convert_variables_to_constants(session, graph.as_graph_def(), output_names)
    # Remove training nodes
    graph_frozen = tf.compat.v1.graph_util.remove_training_nodes(graph_frozen)
    with open(output, 'wb') as output_file, open(output_meta.as_posix(), 'w') as meta_file:
        output_file.write(graph_frozen.SerializeToString())
        meta_file.write(json.dumps(meta))

    print ('Inputs = [%s], Outputs = [%s]' % (input_names, output_names))
    print ('Writing metadata to %s' % output_meta.as_posix())
    print ('To convert use: \n   `convert-to-uff %s`' % (output))

```

The 2 main steps are:
* Converting variables to constants in a `Tensorflow` graph definition.
* Removing of training nodes. 

[Here](https://github.com/tikurahul/donkey/blob/donkey-v3-dev/scripts/freeze_model.py) is the full source code on GitHub.

The above script stores the frozen graph definition as a `protobuf`. I could now use `convert-to-uff` to convert the frozen graph definition to `UFF` format.

```bash
# Linear.pb is a frozen Tensorflow graph.
# Converts it and saves the result in Linear.uff
convert-to-uff ../../models/Linear.pb
```

### Inference

Now that I had the UFF model, I needed to use the `tensorrt` python API and `pycuda` to run inferences. 

```python
from collections import namedtuple
from donkeycar.parts.keras import KerasPilot
import json
import numpy as np
import pycuda.driver as cuda
import pycuda.autoinit
from pathlib import Path
import tensorflow as tf
import tensorrt as trt

HostDeviceMemory = namedtuple('HostDeviceMemory', 'host_memory device_memory')

class TensorRTLinear(KerasPilot):
    '''
    Uses TensorRT to do the inference.
    '''
    def __init__(self, cfg, *args, **kwargs):
        super(TensorRTLinear, self).__init__(*args, **kwargs)
        self.logger = trt.Logger(trt.Logger.WARNING)
        self.cfg = cfg
        self.engine = None
        self.inputs = None
        self.outputs = None
        self.bindings = None
        self.stream = None

    def compile(self):
        print('Nothing to compile')

    def load(self, model_path):
        uff_model = Path(model_path)
        metadata_path = Path('%s/%s.metadata' % (uff_model.parent.as_posix(), uff_model.stem))
        with open(metadata_path.as_posix(), 'r') as metadata, trt.Builder(self.logger) as builder, builder.create_network() as network, trt.UffParser() as parser:
            metadata = json.loads(metadata.read())
            # Configure inputs and outputs
            print('Configuring I/O')
            input_names = metadata['input_names']
            output_names = metadata['output_names']
            for name in input_names:
                parser.register_input(name, (self.cfg.TARGET_D, self.cfg.TARGET_H, self.cfg.TARGET_W))

            for name in output_names:
                parser.register_output(name)
            # Parse network
            print('Parsing TensorRT Network')
            parser.parse(uff_model.as_posix(), network)
            print('Building CUDA Engine')
            self.engine = builder.build_cuda_engine(network)
            # Allocate buffers
            print('Allocating Buffers')
            self.inputs, self.outputs, self.bindings, self.stream = TensorRTLinear.allocate_buffers(self.engine)
            print('Ready')

    def run(self, image):
        # Channel first image format
        image = image.transpose((2,0,1))
        # Flatten it to a 1D array.
        image = image.ravel()
        # The first input is the image. Copy to host memory.
        image_input = self.inputs[0] 
        np.copyto(image_input.host_memory, image)
        with self.engine.create_execution_context() as context:
            [throttle, steering] = TensorRTLinear.infer(context=context, bindings=self.bindings, inputs=self.inputs, outputs=self.outputs, stream=self.stream)
            return steering[0], throttle[0]

    @classmethod
    def allocate_buffers(cls, engine):
        inputs = []
        outputs = []
        bindings = []
        stream = cuda.Stream()
        for binding in engine:
            size = trt.volume(engine.get_binding_shape(binding)) * engine.max_batch_size
            dtype = trt.nptype(engine.get_binding_dtype(binding))
            # Allocate host and device buffers
            host_memory = cuda.pagelocked_empty(size, dtype)
            device_memory = cuda.mem_alloc(host_memory.nbytes)
            bindings.append(int(device_memory))
            if engine.binding_is_input(binding):
                inputs.append(HostDeviceMemory(host_memory, device_memory))
            else:
                outputs.append(HostDeviceMemory(host_memory, device_memory))

        return inputs, outputs, bindings, stream

    @classmethod
    def infer(cls, context, bindings, inputs, outputs, stream, batch_size=1):
        # Transfer input data to the GPU.
        [cuda.memcpy_htod_async(inp.device_memory, inp.host_memory, stream) for inp in inputs]
        # Run inference.
        context.execute_async(batch_size=batch_size, bindings=bindings, stream_handle=stream.handle)
        # Transfer predictions back from the GPU.
        [cuda.memcpy_dtoh_async(out.host_memory, out.device_memory, stream) for out in outputs]
        # Synchronize the stream
        stream.synchronize()
        # Return only the host outputs.
        return [out.host_memory for out in outputs]
```

[Here](https://github.com/tikurahul/donkey/blob/donkey-v3-dev/donkeycar/parts/tensorrt.py) is the full source code on GitHub.

## Benchmarks

When using the `TensorRT` based UFF model the Jetson Nano, I could do inferences at a frequency of **`100-105Hz`**. 
This meant that I had the headroom to build a `Resnet 18` based model.

## Final Comparison

Here is the final comparison of all techniques used to speed up ML inference. Using `TensorRT`, I had improved the rate of inference by **`2.5x`** the previous result.

<div class="mdc-data-table">
    <div class="mdc-data-table__table-container">
        <table class="mdc-data-table__table" aria-label="Benchmarks">
        <thead>
            <tr class="mdc-data-table__header-row">
                <th class="mdc-data-table__header-cell">Model</th>
                <th class="mdc-data-table__header-cell">Inference Frequency</th>
            </tr>
        </thead>
        <tbody class="mdc-data-table__content">
            <tr class="mdc-data-table__row">
                <td class="mdc-data-table__cell">Keras [TF-GPU]</td>
                <td class="mdc-data-table__cell">25 Hz</td>
            </tr>
            <tr class="mdc-data-table__row">
                <td class="mdc-data-table__cell">Keras [Performance Mode]</td>
                <td class="mdc-data-table__cell">40-42 Hz</td>
            </tr>
            <tr class="mdc-data-table__row">
                <td class="mdc-data-table__cell">TensorRT</td>
                <td class="mdc-data-table__cell">100-105 Hz</td>
            </tr>
        </tbody>
        </table>
    </div>
</div>

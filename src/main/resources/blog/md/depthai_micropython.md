Aug 14 2021, Saturday

## MicroPython support for the OAK-D-IOT platform

I have talked about [computational cameras](/blog/depthai_camera.html) in the past.

Recently I came across [this](https://shop.luxonis.com/products/bw1092) device, which supports an on-board `ESP32` which provides WiFi, Bluetooth (including BLE) among other things. I had a project in mind, which would take advantage of both the camera hardware and the BLE to do something *interesting*. 


### Communicating with the ESP32

To communicate with the on-board ESP32, the camera uses the `SPI` protocol. Depth AI provides [this](https://github.com/luxonis/depthai-spi-api/) C++ library. 
To take advantage of this, a developer has to use the [ESP-IDF SDK](https://github.com/espressif/esp-idf) and the provided C++ library. The library provides an abstraction for well known packet types, and also groups packets into logical streams.

I rarely write C/C++ these days, and had *naively* made the assumption that I could just flash MicroPython on the ESP32 and write Python instead.

The custom SPI library however, meant that I could not use MicroPython without re-implementing the C++ library. That was going to be a lot of work. 

### User-C modules in MicroPython

MicroPython provides a way to compile [additional](https://docs.micropython.org/en/latest/develop/cmodules.html) C / C++ modules when building from source. These types of modules are typically used to get access to certain hardware resources or overcome Python speed limitations. 

This meant that in theory, I could use the Depth AI C++ library and add a Python shim. That way the rest of the application can be written in Python, and did not have to involve any C / C++ whatsoever. 

I am all for writing as few lines of C / C++ if possible; This also seemed like a fun project, given I had never done something like this before. 

### The Build System

When building MicroPython from source, one typically uses `make` and `cmake`. I found [this](https://github.com/micropython/micropython/tree/master/examples/usercmodule) example module extremely helpful. I used this as a reference to author my [`micropython.cmake`](https://github.com/tikurahul/micropython/tree/depth-ai/examples/depthai) file.

MicroPython defines additional utilities in `py/runtime.h`, `py/obj.h` to help with Python interop. The example C module only scratches the surface of those APIs.

Another thing to keep in mind was that Depth AI libraries were authored using C++. MicroPython on the other hand, expected the core headers of the user module to be defined in C. This meant that I needed to use `extern`, to prevent the C++ compiler from obfuscating the symbols such that they could still be linked to the C headers. 

*Have I mentioned, that I have not written a lot of C++ recently ? This is information that I had completely paged out.*

### Implementing the C Module

Part of this was figuring out which utilities were going to be helpful. The module is open-source, and you can take a look at what I did [here](https://github.com/tikurahul/micropython/tree/depth-ai/examples/depthai). [This](https://github.com/tikurahul/micropython/blob/depth-ai/examples/depthai/spi/spi.h) is the core module definition. 

Here are some notes that will help you follow along:

* `mp_obj_t` represents the core Python type. There are utilities defined in `py/runtime.h` which can help convert between the base `mp_obj_t` type to the corresponding C types. For e.g. `mp_mp_obj_str_get_str(...)` converts a `mp_obj_t` to a `const char*`. 

* `mp_call_function_x` can help invoke Python functions. For e.g. `mp_call_function_0` invokes a Python function with zero arguments. Note: the `args` here need to be instances of the `mp_obj_t` type.

* A couple of other useful helpers were:

```c
// Converts a Python buffer type (anything which is a memoryview(...)) to a corresponding mp_buffer_info_t type.
// This was an easy way to copy a buffer to a void* of data.
void mp_get_buffer_raise(mp_obj_t obj, mp_buffer_info_t *bufinfo, mp_uint_t flags);

// The mp_obj_new_bytearray converts a (size_t, void*) to a Python buffer type.
mp_obj_t mp_obj_new_bytearray(size_t n, void *items);
```

Once you figure out these APIs, things that seemed magical before, start to make much more sense. A lot of my findings came from reading existing modules in the MicroPython source tree and asking questions on the Adafruit Discord for CircuitPython (which is a MicroPython fork maintained by Adafruit). Special shout-out to `Jeff E.` from the Discord group; you sir are awesome. Thanks for helping me out.

### Demo

After spending a couple of days, I finally had a fully working module. Now, all I needed to do was to test things out. Here is a screencast of the module working end-to-end.

<br/>
<iframe class="video" src="https://www.youtube.com/embed/neWpzXRJViE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Appendix

The `ESP32` on the `OAK-D-IOT` supports 4 MB of Flash. It's easy to run out of space in the `application` partition in the default MicroPython build. This is easily fixed by defining custom partition tables [1](https://github.com/tikurahul/micropython/blob/depth-ai/ports/esp32/boards/DEPTH_AI/sdkconfig.board), [2](https://github.com/tikurahul/micropython/blob/depth-ai/ports/esp32/partitions-depthai.csv). This is relatively straightforward, and required only a little bit of trial and error. 

To build MicroPython with a custom board configuration, you need to do something like:

```bash
# Setup ESP-IDF

# Invokes $IDF_HOME/export.{bash|fish}
idf-setup

# Requires setting up mypy-cross (the cross compiler)
cd $MICROPYTHON_SRC/ports/esp32
make USER_C_MODULES=$MICROPYTHON_SRC/examples/depthai/micropython.cmake BOARD=DEPTH_AI

# Then flash the binary using idf.py
idf.py -p /dev/ttyUSB0 flash
```

Mar 27 2020, Friday

## Bokehlicious Selfies

I signed up for the excellent [fastai MOOC](https://course.fast.ai/) recently, and one of the project ideas I had was the idea of adding [`bokehs`](https://en.wikipedia.org/wiki/Bokeh) to selfies using Deep learning. Most phones have a not so great selfie (front-side) camera and therefore this idea has some merits.

Google Photos does something like this and it's quite magical _when it works_. So i wanted to experiment with a simple pipeline which could be used to add a `bokeh` to a selfie that did not have one. 

## Breaking down the problem

One idea I had was to be able to use image-segmentation to identify and build a segmentation `mask` around the person in the image. For this I used the excellent `torchvision.models.detection.maskrcnn_resnet50_fpn` pretrainted model.  This model has been trained with the [COCO dataset](http://cocodataset.org/#home), and therefore is pretty great out of the box for the given use-case.

Once we have a segmentation `mask` of the person in the image; we could then use that to split the image into a `foreground` or a `subject`, and the rest of it would be `background`. I could then use image convolution to create a `bokeh` effect on the `background` image and merge it with the `subject` to give it a nice pop.

One key thing to remember is that the `merged` image is _only_ as good as the segmentation `mask`, but given I am restricting the input image type to a portrait `selfie` this works _most_ of the time.

## Let's write some code

### The Bokeh Effect

I read this [incredible article](https://www.scratchapixel.com/lessons/digital-imaging/simple-image-manipulations/bookeh-effect) on how to simulate a `bokeh` effect.  I then adapted the idea and wrote a quick `Python` implementation using some helpers from `OpenCV`. 

Let's start with our imports.

```python
import cv2
import math
import numpy as np
import matplotlib.pyplot as plt

plt.rcParams["figure.figsize"]= (10,10)
np.set_printoptions(precision=3)
```

We need to build a convolution `kernel` which can produce a `bokeh` effect. The idea here is to take a `gaussian` kernel with a large standard-deviation and multiply it with a simple binary mask to emphasize the effect. 

```python
triangle = np.array([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
], dtype='float')

mask = triangle
kernel = cv2.getGaussianKernel(11, 5.)
kernel = kernel * kernel.transpose() * mask # Is the 2D filter
kernel = kernel / np.sum(kernel)
print(kernel)
```

This produces something like:

```
[[0.    0.    0.    0.    0.    0.    0.    0.    0.    0.    0.   ]
 [0.    0.    0.    0.    0.    0.016 0.    0.    0.    0.    0.   ]
 [0.    0.    0.    0.    0.018 0.018 0.018 0.    0.    0.    0.   ]
 [0.    0.    0.    0.    0.02  0.02  0.02  0.    0.    0.    0.   ]
 [0.    0.    0.    0.02  0.021 0.021 0.021 0.02  0.    0.    0.   ]
 [0.    0.    0.    0.02  0.021 0.022 0.021 0.02  0.    0.    0.   ]
 [0.    0.    0.018 0.02  0.021 0.021 0.021 0.02  0.018 0.    0.   ]
 [0.    0.    0.017 0.019 0.02  0.02  0.02  0.019 0.017 0.    0.   ]
 [0.    0.013 0.015 0.017 0.018 0.018 0.018 0.017 0.015 0.013 0.   ]
 [0.    0.012 0.013 0.015 0.016 0.016 0.016 0.015 0.013 0.012 0.   ]
 [0.008 0.01  0.011 0.012 0.013 0.013 0.013 0.012 0.011 0.01  0.008]]
```

Let's try the `kernel`. First, lets load the input image:

```python
# Credit for the image: https://fixthephoto.com/self-portrait-ideas.html
image = cv2.imread('images/selfie-1.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
plt.imshow(image)
```

![Original] (/assets/images/selfie_original.png)

Now, let's define the actual `bokeh` function that applies the kernel.

```python
def bokeh(image):
    r,g,b = cv2.split(image)

    r = r / 255.
    g = g / 255.
    b = b / 255.

    r = np.where(r > 0.9, r * 2, r)
    g = np.where(g > 0.9, g * 2, g)
    b = np.where(b > 0.9, b * 2, b)

    fr = cv2.filter2D(r, -1, kernel)
    fg = cv2.filter2D(g, -1, kernel)
    fb = cv2.filter2D(b, -1, kernel)

    fr = np.where(fr > 1., 1., fr)
    fg = np.where(fg > 1., 1., fg)
    fb = np.where(fb > 1., 1., fb)

    result = cv2.merge((fr, fg, fb))
    return result

result = bokeh(image)
plt.imshow(result)
```

![Full Bokeh] (/assets/images/selfie_bokeh_full.png)

We now have a method that can generate a `bokeh` effect for a given image.

### Image Segmentation

We now need to use the `torchvision.models.detection.maskrcnn_resnet50_fpn` pretrained model to segment the above image to split into `foreground` & `background`. Let's do that.

```python
import torch
import torchvision

model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
model.eval()

image = cv2.imread('images/selfie-1.jpg')
image = cv2.cvtColor(original, cv2.COLOR_BGR2RGB) # OpenCV uses BGR by default

image = image / 255. # Normalize image
channels_first = np.moveaxis(image, 2, 0) # Channels first

# The pre-trained model expects a float32 type
channels_first = torch.from_numpy(channels_first).float()

prediction = model([channels_first])[0]
scores = prediction['scores'].detach().numpy()
masks = prediction['masks'].detach().numpy()
mask = masks[0][0]  
plt.imshow(masks[0][0])
```

This produces a segmentation-mask which looks like:

![Segmentation Mask] (/assets/images/selfie_segmentation_mask.png)

### Splitting & Merging

Now that we have a segmentation-mask we can split the image into `foreground` and `background` like so:

```python
inverted = np.abs(1. - mask)

r,g,b = cv2.split(image)
mr = r * mask
mg = g * mask
mb = b * mask
subject = cv2.merge((mr, mg, mb))

ir = r * inverted
ig = g * inverted
ib = b * inverted
background = cv2.merge((ir, ig, ib))

subject = np.asarray(subject * 255., dtype='uint8')
plt.imshow(subject)
```

![Foreground] (/assets/images/selfie_foreground.png)

Let's now apply the `bokeh` effect on the `background` image and them merge both images.

```python
background_bokeh = bokeh(np.asarray(background * 255, dtype='uint8'))
background_bokeh = np.asarray(background_bokeh * 255, dtype='uint8')
combined = cv2.addWeighted(subject, 1., background_bokeh, 1., 0)
plt.imshow(combined)
```

![Selfie with Bokeh] (/assets/images/selfie_bokeh_pop.png)

## Conclusion

Deep learning is magical for applications like these. I hope you enjoyed reading the article.

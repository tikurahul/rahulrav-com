June 30 2019, Sunday

### Adventures building a Self Driving RC Car

Having read some amazing books on Machine Learning, I had been looking for opportunities to apply ML from first principles in the real world. That was what got me curious about the wonderful [Donkey Car](https://docs.donkeycar.com) project. The project is essentially a how-to guide to building your own RC car which can drive itself around a track using classicial control theory, computer vision or in my case Machine Learning. After attending a DIYRobocars meetup, I could not wait to build my own car.

I knew I wanted to do something different with _my_ donkey car. So for my first build I chose an [Asus Tinkerboard S](https://www.amazon.com/gp/product/B00FS83U42/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS83U42&linkCode=as2&tag=rahulrav30day-20&linkId=82561a94ffc14365fe9ba794e61d0156), a [JeVois](http://jevois.org/) camera and [other](http://docs.donkeycar.com/guide/build_hardware/#parts-needed0) standard bill of materials.

I went with a [Asus Tinkerboard S](https://www.amazon.com/gp/product/B00FS83U42/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS83U42&linkCode=as2&tag=rahulrav30day-20&linkId=82561a94ffc14365fe9ba794e61d0156) despite knowing that most members of the Donkey community were using a Rasbperri Pi 3B+. My main motivations were:

* More RAM (2 GB vs. the 1 GB in the Raspberry Pi)
* 16 GB of EMMC Flash (The Pi required the use of a Micro SD card which is not great for I/O)

I chose the [JeVois](http://jevois.org/) camera because I liked having the freedom of doing some computer vision as well. The [JeVois](http://jevois.org/) is a full-fledged Linux computer which has an on-board GPU as well. I ended up taking advantage of the camera by implementing a [fast contrast stretching](https://journals.sagepub.com/doi/full/10.1177/1550147718793803) algorithm to normalize for lighting conditions as a preprocessing step for the ML model.

#### Learnings

Choosing the [Asus Tinkerboard S](https://www.amazon.com/gp/product/B00FS83U42/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS83U42&linkCode=as2&tag=rahulrav30day-20&linkId=82561a94ffc14365fe9ba794e61d0156) required me to understand a lot about the `donkeycar` framework. This was because everything in the documentation assumed that you were using a Raspberry Pi and in my case I was not. To make matters more difficult I had also chosen a different camera so I to write my own module to make things work.

I also realized that, while the [Asus Tinkerboard S](https://www.amazon.com/gp/product/B00FS83U42/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS83U42&linkCode=as2&tag=rahulrav30day-20&linkId=82561a94ffc14365fe9ba794e61d0156) had advantages over the Raspberry Pi 3B+, I had just enough headroom to run the stock Nvidia [End to End Self Driving](https://images.nvidia.com/content/tegra/automotive/images/2016/solutions/pdf/end-to-end-dl-using-px.pdf) model at a resolution of `160 x 128 px`. 

#### Hello, Jetson Nano

I wanted to experiment with more sophisticated models. As i was constrained by the CPU on the [Asus Tinkerboard S](https://www.amazon.com/gp/product/B00FS83U42/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FS83U42&linkCode=as2&tag=rahulrav30day-20&linkId=82561a94ffc14365fe9ba794e61d0156), I decided to level-up using the [Nvidia Jetson Nano](https://developer.nvidia.com/embedded/jetson-nano-developer-kit).

The [Nvidia Jetson Nano](https://developer.nvidia.com/embedded/jetson-nano-developer-kit) is an _amazing_ single board computer which has a real GPU with `128` CUDA cores. Nvidia also has great software support including their Jetpack SDK, and they ship a customized version of Tensorflow `1.13.1` for the Nano. 

For the last couple of weeks, I was busy building a new car with the Jetson Nano. 

<p>
  <img src="/assets/images/donkey_top_view.jpg" 
       alt="Top View" title="Top View" width="640px" />
  <br /> <br />
  <img src="/assets/images/donkey_side_view.jpg" 
       alt="Side View" title="Side View" width="640px" />
</p>

The Jetson Nano has been an absolute joy to use. I am running both the fast contrast stretching algorithms, as well as the ML model on the GPU. I compiled Open CV 4.1 for the Jetson Nano and contributed a [how-to guide](http://docs.donkeycar.com/guide/robot_sbc/setup_jetson_nano/#step-4-install-opencv) on doing that.

A few more tweaks after, and I had Donkey `3.0.2` running really well on a Jetson Nano. I also added some more components to the bill of materials including a [PiOLED Display](https://www.amazon.com/gp/product/B07MM68H8M/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B07MM68H8M&linkCode=as2&tag=rahulrav30day-20&linkId=b79b276e51d99f4b1992fde28ca7f4a8) which I added to the car to display some stats. The source code for this additional module is [here](https://github.com/tikurahul/donkey/blob/donkey-v3-dev/donkeycar/parts/oled.py).

#### The Race

The race was a lot of run, and I managed to do my personal best which was a lap-time of `13.1s` around the track. My 3-lap timing was `37s`. My previous finish was `27s` for 1 lap. (I have come a long way). 

Here is a video of the race. The first one was my best, and in the second video I tried to make it go faster.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZuLRl7sVpfU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/zwWEDV8BoDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Epilogue

If you are wondering why the car looks familiar, [@NvidiaEmbedded](https://twitter.com/NVIDIAEmbedded) recently [tweeted](https://twitter.com/NVIDIAEmbedded/status/1143993091537481729) a picture of my car. Thank you for the shout-out [@NvidiaEmbedded](https://twitter.com/NVIDIAEmbedded).


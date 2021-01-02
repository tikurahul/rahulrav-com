December 27 2020, Monday

## Building an E-Ink Calendar, and a UI Toolkit along the way

Having worked from home for the better part of the year, I recently started to work on a new project. Building a E-Ink based dashboard which would keep track of my meetings among other things. Given the always-on nature of the E-Ink display, this would help me better manage by schedule during a typical work-day especially given I tend to miss Google Calendar notifications _a lot_. 

This is what the end result looks like:

![E-Ink Dashboard] (/assets/images/e_ink_end_result.jpg)

The app here is showing the next 5 Calendar events for __a demo Google account__.
Looks nice and simple, does it not ?

### The Hardware

I took an off-the-shelf approach for the hardware. I purchased an [InkPlate 6](https://inkplate.io/) which was originally crowd-funded on [CrowdSupply](https://www.crowdsupply.com/e-radionica/inkplate-6).

The E-Ink display is from a recycled Kindle e-reader, which means its a pretty great display. It has 2 modes including a 2-bit per pixel gray-scale mode and monochrome. It supports partial updates in monochrome mode. The display is connected to a `ESP 32`, with built-in WiFi. All we need to do is to hookup the display to a PC via a USB cable and power it on. The display also comes with a nice 3D printed enclosure. 

### The Software

The InkPlate 6 supports MicroPython, and recently the libraries powering the display were [opensourced](https://github.com/e-radionicacom/Inkplate-6-micropython). This gave me a decent foundation to build on top-of.

#### OAuth2 support

The first step to showing events from Google Calendar is to be able to complete an `OAuth2` flow. I decided to use the [device flow](https://developers.google.com/identity/protocols/oauth2/limited-input-device) given the limited input capabilities of the ESP 32. 


MicroPython does not have any libraries that work with `OAuth2`, so I decided to write one. Here is the [PR](https://github.com/micropython/micropython-lib/pull/407) that I eventually made to the [micropython-lib](https://github.com/micropython/micropython-lib) GitHub repo which adds support for this specification. This ended up being pretty straightforward, given my familiarity with OAuth2 (having authored [this](https://github.com/openid/AppAuth-JS) library before).

#### Building a limited UI-Toolkit

The `InkPlate` has a decent [Graphics](https://github.com/e-radionicacom/Inkplate-6-micropython/blob/master/gfx.py) API, but rather than having to hard-code coordinates to render UI i decided to take minor detour and build a mini UI Toolkit from first principles based on the graphics primitives that were supported. I took a lot of inspiration from the _existing_ Android UI View system and build a small subset of those APIs.

##### Measuring text

The first step was to be able to measure the text to be able to compute how much space `text` with a given `text size` would occupy on the screen. The `InkPlate` uses bitmap fonts, so i ended up using a look-up-table for widths and heights for individual letters for a given size. It's an approximation, but it worked well enough for me to proceed to the next step.

![Step 1: Measuring text] (/assets/images/e_ink_step_1.jpg)

##### Columns, Alignment and Padding

Now that I had text measurements I could start drawing some text in `Columns` and `Rows` (these are the containers supported by the  custom layout system). I managed to also implement `padding` and text `alignments`. Not perfect, but still pretty good progress. 

The image below consists of a single `Column` with a nested `Row` and a bunch of `Text` nodes in various alignments and sizes. The `10px` box on top is a component called `Spacer` which just occupies empty space on the screen.

![Step 2: Columns, Padding & Alignments] (/assets/images/e_ink_step_2.jpg)

##### Columnar Layouts and alignments

Now that I had some basic building blocks, I decided to go further and implement more complex layouts. I implemented support for `aligning` containers and fixed a lot of bugs when nesting containers. You can also see `text alignments` within individual `Column` containers working.

![Step 3: Columnar Layouts & Nested Containers] (/assets/images/e_ink_step_3.jpg)

##### Supporting Images

I finally added support for `Image` nodes to layouts. This is also when I started to add some much needed UI polish. 

![Step 4: Supporting Images & Initial UI] (/assets/images/e_ink_step_4.jpg)

##### Miscellaneous Features 

I also worked on other additional features along the way, including:

* Support & configuration for time zones. The MicroPython runtime on the ESP 32 does _not_ ship with a Time Zone database and the real time clocks only support UTC seconds after epoch. 
* Support for token caching & persistence. This was a big feature because this would mean that I could serialize the `auth state` on the device. This meant that I did not have to do the full `OAuth2` dance every single time I started the app.
* A small `DateTime` library capable of formatting dates in a couple of different formats. 
* Support for `Deep Sleep`. This would allow the device to conserve power by not having to do anything. The device would only wake up once every `N` minutes to refresh the events in the `Calendar`. 

### Summary

This project was a __lot of fun__. I learnt a lot, especially given that I did not intend to build a UI Toolkit when I started working on the project). The toolkit i built is janky, but it is an accomplishment, considering I have never built one before. 

MicroPython was incredible to prototype with (despite lacking a graphical debugger). I would highly recommending picking up a board that supports MicroPython for your next hardware project. The MicroPython community (libraries + forums) is also pretty active and helpful

### Epilogue

All the source code that I wrote for the project is on [GitHub](https://github.com/tikurahul/Inkplate-6-micropython). The entry point is a file called [`app.py`](https://github.com/tikurahul/Inkplate-6-micropython/blob/master/app.py). Bear in mind, that all of this code was written in ~ a week long period. I also plan on making some more minor improvements to the UI. 
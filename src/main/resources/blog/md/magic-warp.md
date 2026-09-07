August 24 2026, Monday

## The Year of Magic Move

I have been using a Framework 16 as my daily driver ever since its launch. For a long time, I maintained a fragile truce dual-booting Ubuntu and Windows. But in late 2025, I finally pulled the plug, wiped both, and went all-in on **CachyOS**. Why I switched is probably worth a dedicated blog post, but the short version: I couldn't be happier. Arch has been an absolute breath of fresh air.

At work, my daily machine is an M5 MacBook. Lately, macOS has felt increasingly frustrating to live with—how Apple managed to trade away desktop snappy performance in favor of `Liquid Glass` eye candy is a compromise I will never quite understand.

Moving to Linux full-time was surprisingly painless. Most tools I rely on had native Linux builds, and for the few that didn't, solid alternatives stepped in. But there was one painful sacrifice: **Apple Keynote** (and, more specifically, its crown jewel: **Magic Move**).

As someone who speaks at conferences fairly often, having great presentation tooling isn't just a nice-to-have—it's essential. For years, I had the luxury of leaning on Keynote to make complex technical concepts look effortless. Walking away from that workflow stung.

## Magic Move, and Its Shortcomings

Yet for all its brilliance, Magic Move has always had a glaring blind spot: **animating code snippets**.

If you've ever tried to transition between two snippets of code in Keynote, you know the pain. It morphs characters awkwardly, scrambles tokens, and forces you into brittle workarounds—splitting text blocks into invisible boxes and hand-tuning positions just to highlight a refactoring step. You *can* make it look good, but only through stubborn brute force.

Working on the [Jetpack Compose](https://developer.android.com/compose) team—a UI toolkit that is now fully [multiplatform](https://kotlinlang.org/compose-multiplatform)—this comes up constantly. In fact, it's practically an annual tradition: every Google I/O or major conference season, someone on the team inevitably stares at a broken slide transition and says: *"What if we just built our own Keynote to animate code properly?"*

There have also been a couple of brave souls who have done so, with varying levels of success. I have not been able to make that transition yet. This is mainly because Keynote has amazing visual WYSIWYG tooling for the parts of your presentation that is **not** code. The slide templates are also very nice and tasteful (although these days Apple is putting more and more things behind a subscription).

## The Trigger

A couple of weeks ago on HN, there was a [project](https://github.com/nyblnet/bento) that really caught my attention.

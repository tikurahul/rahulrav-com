Jan 20 2026, Tuesday

## 10 Years at Google

I completed my 10 year anniversary at Google in `August 2025`. I am usually the person who ends up getting antsy, and eventually looks for a new opportunity around the 4-5 year mark (your typical Bay Area SWE). Google has been different. At this point, I have spent almost 25% of my lifetime in one company. Below is a brief rundown of all the things I worked on during my tenure and some of the things I learned along the way.

> __Warning:__ This is a longer-than-usual post. Grab a coffee.

> If you are wondering about the timing of the blog post (given its been many months since I hit my 10 year mark) - I was debating if it was even worth writing this at all. Hence, the delay.

### Pre-Google Career

I joined Google in `2015`, after a brief stint at Apple working on Indoor Maps (an incredibly fun project).

Prior to that, I had worked on Android (as both an application and a platform developer) at Amazon building the In-App purchasing SDK for the first Android based Kindle (Fire). I subsequently worked on the fabled `4C` (Fire) Phone for a couple of weeks, before being asked to switch over to Fire TV as part of the team who was tasked with re-imagining what the TV experience for the App Store should be. Before that, I did more mapping at ESRI.

> When interviewing for a job, my goal is to try and challenge myself to try doing that I have not done before. I try not to chase technologies; instead I try to find interesting problems.

At Amazon & Apple, I got a chance to build both backends as well as ship developer facing SDKs; so I thought building / learning bring-up of __core__ cloud infrastructure might be a cool thing to have on one's resume. I interviewed (and subsequently got an offer) from Microsoft with the Azure Fabric team (one of the most intense programming interviews I had if memory serves). The other option was to try and challenge myself to write some C++ / unmanaged code (which I last wrote in my University days) while also trying to make the web a better place. The dream was to contribute to a project like Google Chrome. I was so inspired by the incredible cadence at which the Chrome team shipped new features; especially Chrome DevTools which I was a huge user of.

### The Google Interview

I got to skip my phone interviews at Google thanks to the recommendations of my former colleages (from Amazon) who were working on the Android team. This was going to be my second attempt at the Google on-site. I remember the questions being challenging and fun. Interestingly, minutes after the final round as I was walking towards my rental car - I was trying to make a mental note of all the questions that I had been asked; but I could only vaguely remember the questions. I attribute this to the stress and nervous energy. I think I was just relieved that the interview was finally over; and the matter was no longer in my hands. Of the 5 interviews on that day, at least 4 of them had gone really well and I had a disconnect with at least one interviewer (who kept interrupting / trying to help me perhaps?).

### Team Matching

Google Chrome (the core browser team) was not hiring given they were amidst a hiring freeze at the time. However Federated Identity team was hiring and I thought that might be a fun thing to do (given they build on top of Chrome Sync). I had never done anything Identity before; and only had a vague idea of how OAuth / OpenID worked. So I signed up.

### 2015 - 2018 (Federated Identity at Google)

I finally learned how [OAuth2](https://github.com/openid/AppAuth-JS) works under the hood. It turns out that one of the spec writers literally sat next to me. It is truly amazing how much one can learn just by osmosis. Here are some of the projects we ended up shipping:

* YOLO (You Only Login Once) on Android (A Google Play Services API for one tap sign in & automatic credential management)
* Smart Lock for Passwords on the Web (also now known as One Tap Sign in for the Web)
* Firebase Auth SDK for Android, while Google Play Services was undergoing a massive refactor (focus on quality). Fellow Googlers remember this period as `GMS Winter`.

Despite my efforts to do something different (not work on Android SDKs, given I wanted to try to do something new) I kept getting pulled into Android. The team had realized that I actually knew a lot about the the platform and had also managed to figure out how some of the other core infra in Google Play Services worked under the hood. So I was the perfect person to work on these sorts of projects.

> I realized that __resistance was futile__, and I might as well try to work on more foundational APIs on Android.

### 2018 - Present

I joined the Android Architecture Components team in August 2018. My first project was going to be to build an SDK that overhauled persistent background processing on Android ([WorkManager](https://d.android.com/work)).

#### WorkManager

Android Lollipop (`API 21`) came with some new foundational background processing APIs on Android (a.k.a. `JobScheduler`). On iOS the equivalent is the `BGTaskScheduler` API.

Android always had *support libraries* that backported features to prior versions of the platform to the best of their ability, but years after the `JobScheduler` APIs were released, no compat libraries came about. I always wondered why such a library never existed?

Years later, having joined Google and subsequently the team that worked on these sorts of libraries; I realized, I was __going to be__ building the API!

Also, we were going to have to reconcile `ListenableFuture`s, `RxJava`-isms and the world of Kotlin Coroutines; all ways of doing work off main thread and ensuring our approach was compatible with these separate (albeit similar) APIs. We were also going to try and unify / sherlock other popular Android Libraries such as Evernote's `JobDispatcher` (IIRC), `GCMNetworkManager`, and `FirebaseJobDispatcher` that were trying to address this gap.

__2 Google I/Os__ later; we finally shipped a stable release! Our team had accomplished an implementation of `WorkManager` by a combination of a complex state machine and `AlarmManager` (for API < 23) and used `JobScheduler` on newer platform versions. We built a much more ergonomic API. Most Google Apps started using the library (including Search, Gmail, Messages etc.), and started to report impressive battery savings & throughput metrics. We had managed to pull this off!

Before the project had started, I thought I had a pretty good grasp of Java concurrency primitives. By the end of this project I realized that concurrency at scale is a different kind of challenge.

> Simple abstractions tend to scale. The goal is to __not try and be too clever__.

#### Early Android Performance Work

I had started working on some performance adjacent APIs while I was working on `WorkManager`.

One such library was the `androidx.startup` library - which creatively used the Android build systems' manifest-merger to discover all components that needed to be initialized during application startup. These components were light weight, and could define other components as dependencies; `androidx.startup` would discover and initialize them in the right order. Classic topological sort-ish.

The library tried to do this as efficiently as possible.

> When building the library, I realized how difficult it is to benchmark on Android. So many things get in the way when you try and measure what the cost of code execution is. Shader caches, GC, JIT and profile guided optimization (`PGO`) to name a few. Android did not have an official recommendation for how one should write benchmarks to optimize code.

#### AndroidX (Macro) Benchmarks

Android engineers had the ability to measure how long isolated small pieces of code took to run (`micro`benchmarks). Think data structures, or algorithms that are designed specially for the Android Runtime (`ART`). Developers never had the ability to measure things at a `macro` level. Think application startup, frame durations for jank, anything that involved process bring-up. The Android Platform had an internal library but it made all sorts of assumptions (like the device being rooted for e.g.) and a lot of the supporting infra (regression detection, dashboarding et. al.) was closed source.

Our team set out to build an implementation of this library that we could share externally; so other developers could write these sorts of benchmarks. This was a tremendous learning experience given I also spent some time getting to know about all the clever things `ART` and the `Android Platform` did to speed up app startup. I also spent a lot of time reading traces and getting familiar with the capabilities of system tracing in general ([Perfetto](https://perfetto.dev)).

#### Jetpack Compose and Baseline Profiles

I did not really contribute too much in the building of the new UI toolkit. I just got to watch the team very closely, and learn from all the amazing design documents that this project ended up producing. It consumed the majority of the Android UI Toolkit's team time at the time. I simply cheered from the sidelines.

> Secretly, I was hoping that I would never have to learn how to write a custom `ViewGroup`. (Please don't tell my boss).

After a couple of years in, we realized we were getting closer and closer to a ship date, that had been set in stone. We had to make sure that this toolkit was ready. The team wanted to make sure that we were at least as good as the old UI toolkit (based on `View`s). As things turned out - the new toolkit faced a __significant__ hurdle.

The `View` based UI Toolkit is distributed as part of the operating system. This code therefore benefits from profile guided optimizations (and is fully AOT-compiled on many versions of the platform). These classes are ready to use __immediately after app startup__, because the Zygote, pre-fork, has the toolkit loaded and ready to go.

Jetpack Compose is an unbundled UI toolkit. This code shipped as part of the app and *not* the platform. This meant:

* This code won't automatically benefit from profile guided optimizations (`ART` would have had to figure out hot code paths, which could take a __long__ time).
* Apps would __have to pay__ the cost of classloading the toolkit.

> Throughout my professional career, I have always tried my best to be a generalist. While I enjoy diving deep into how UI Toolkits (like React, Compose etc.) work & perform, I also enjoy working on distributed systems. Even at Google, I had managed to do both (prior to joining to the UI Toolkit team). The only reason why I was chosen to work on this project was because I had backend experience at Google, and we needed to ship this in ~ 6 months. If we did not do this, Jetpack Compose could not go stable.

While I won't dive into every technical detail here, (see [1](https://www.youtube.com/watch?v=yJm5On5Gp4c) and [2](https://developer.android.com/topic/performance/baselineprofiles/overview)), but suffice it to say we advanced the state of the __*ART*__ (pun intended) when it came to leveraging profile guided optimizations on Android. This code gave me the opportunity to work on Flume pipelines, build developer tooling in Android Studio, and work on more libraries & benchmarking tools. I also got the opportunity to build a completely new backend for `ART Cloud` and integrated it into the app publishing pipeline.

> We originally estimated 6 months to its first version (good enough to unblock Compose launch); and a couple more months of polish. This project took `~2.5 years`, because it was the gift that kept giving. We found more and more places where we could take advantage of PGO as part of the app build / publish pipeline. This work also paved the path for [dex layout optimizations](https://developer.android.com/topic/performance/startupprofiles/overview) on Android.

#### Tracing 2.0

A little over a year ago, we were lamenting the state of app tracing on Android. We set out to build a new library, to overhaul how tracing worked, with support from [Perfetto](https://perfetto.dev). We built the library as part of a hackathon, to prove that the idea could work.

> I thought it would take me another couple of months to wrap this up. A year later, we are finally approaching the `alpha01` release for this library. Thanks to my colleagues who are a lot smarter than I am, we significantly improved the overhead of tracing. We had a few teams experimentally use the library and give us a lot of useful feedback. Also, other internal Google teams have helped us refine the API to make it more extensible and frankly more capable.

### Learnings

* Being a generalist, and generally curious about how things work under the hood __really helps find problems__ that would have otherwise gone unnoticed.
* Surrounding yourself with people who are a __lot__ smarter than you are really helps level up quickly. I have had the opportunity to talk to, and work with so many incredibly smart engineers at Google. I am forever grateful for the opportunity.
* Being open to learning new things helps a __lot__. I worked on some applied `ML` projects in Google as part of my `20%` work after completing some coursework on Deep Learning and NLP. Finding solutions to real-world problems was very satisfying.
* Being at the right place, at the right time with the right set of skills helps quite a lot.

April 6 2020, Monday

## Introducing androidx.dev

A few weeks ago, I wrote a blog about using [AndroidX Snapshot](/blog/using_snapshot_builds.html) builds. However, discovering the `repository` URL's and keeping up with the changes in AndroidX build infrastructure can be daunting. We also wanted to make it a _lot_ easier to consume AndroidX & Jetpack Compose snapshot builds.

To help with this problem, we wrote a new web-service to help you discover snapshots and artifacts in builds.

Introducing [androidx.dev](https://androidx.dev).

<img src="/assets/images/androidx_dev.png" alt="androidx.dev" style="width: 80%;" />

<br/>

[androidx.dev](https://androidx.dev) can serve as a Maven repository for serving snapshot builds. Click on the [Snapshots](https://androidx.dev/snapshots/builds) link, to explore which builds are available. You can also get to the latest build using [this](https://androidx.dev/snapshots/latest/artifacts) URL.


## Consuming Artifacts

Once you know the `buildId`, add the following snippet to your `build.gradle` file to consume artifacts from that build.

### AndroidX Artifacts

```
repositories {
    google()
    // Note the build id in the URL. Substitute it with the build you want
    maven { url 'https://androidx.dev/snapshots/builds/[buildId]/artifacts/repository' }
}

// To use this repository:

dependencies {
  // Note the use of the -SNAPSHOT in the name of the artifact
  implementation "androidx.work:work-runtime:2.4.0-SNAPSHOT"
}
```

### Jetpack Compose Artifacts

To use the latest [Jetpack Compose](https://developer.android.com/jetpack/compose) builds, use the snippet below:

```
repositories {
    google()
    // Note the build id & `ui` in the URL. Substitute it with the build you want
    maven { url 'https://androidx.dev/snapshots/builds/[buildId]/artifacts/ui/repository' }
}

// To use this repository:

dependencies {
  // Note the use of the -SNAPSHOT in the name of the artifact
  implementation "androidx.ui:ui-tooling:0.1.0-SNAPSHOT"
}
```

That's really it. Hope you enjoy using this new service.

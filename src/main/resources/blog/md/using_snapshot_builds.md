Feb 22 2020, Saturday

## Using AndroidX Snapshot Builds

AndroidX libraries can release once every two weeks. All development is done in the open, and you can follow along changes to the `androidx-master-dev` branch using [Android Code Search](https://cs.android.com/androidx/platform/frameworks/support).

The 2 week release cycle can sometimes get in your way because:
* You want to try out an un-released feature in your favorite library.
* You want to try out a new library in Jetpack which has not been published yet; [androidx.startup](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-master-dev:startup/) for example 😉. 
* One of your bugs / feature request has now been fixed and you want to verify that it actually works.

To account for these use-cases recently we made `snapshot` builds available to developers. 

### What are Snapshots ?

Everytime a change request is sent in the AndroidX source tree, pre-submit checks ensure that all existing tests pass. Once the change lands, our CI server picks up the change and builds all the relevant artifacts. 

You can follow along all the changes being built, by looking at [https://ci.android.com/builds/branches/aosp-androidx-master-dev/grid?](https://ci.android.com/builds/branches/aosp-androidx-master-dev/grid?) (Note that I added the name of the branch that I am interested in `androidx-master-dev` which is where all AndroidX changes land).

Every `row` in the `grid` corresponds to a couple of changes that were made to the AndroidX source tree. You can click on the `View Changes` link to see the changes associated to a build.

Here is an example:

![View Changes] (/assets/images/androidx_ci_changes.png)

Each `row` identifies a build, and is also usually accompanied by `snapshots`. These are artifacts produced as a result of the build, with the changes that were submitted as part of the build. If you don't see `snapshots` for some builds, just pick a more recent build with snapshots. That should have all the changes rolled up. 

![Snapshot] (/assets/images/androidx_snapshot.png)

### Using Snapshot builds

Click on the `View Artifacts` link which looks like a ⬇️icon. [Here](https://ci.android.com/builds/submitted/6228642/androidx_snapshot/latest) is an example link. 

This page lists all the `artifacts` that were built, and you can actually see them organized as a `Maven` repository. Here is what the listing for `work-runtime` looks like for example:

![View Artifacts] (/assets/images/androidx_view_artifacts.png)

To use these artifacts, you should include the following snippet in your `build.gradle` file. 

```
repositories {
    google()
    // Note the build id in the URL. Substitute it with the build you want
    maven { url 'https://ci.android.com/builds/submitted/6228642/androidx_snapshot/latest/raw/repository/' }
}

dependencies {
  // Note the use of the -SNAPSHOT in the name of the artifact
  implementation "androidx.work:work-runtime:2.4.0-SNAPSHOT"
}
```

That's really it. You can now test the changes you want to.

Aug 11 2019, Sunday

### Kotlin Native and the Azure Kinect DK

I loved the K4Windows Developer kit and worked on some gesture based UI using the SDK a few years ago.
Therefore, when Microsoft announced the new Azure Kinect Developer Kit, I was very excited to try it out.

[Azure Kinect DK](https://azure.microsoft.com/en-us/services/kinect-dk/) has an advanced ToF camera system, a microphone array and an RGB camera. I was excited to tinker with the hardware to see what it was capable of. The Azure Kinect SDK is C/C++ based, and supports .NET bindings. Microsoft also made the SDK available for Linux. 

### The SDK + Kotlin Native

I have been meaning to experiment with Kotlin Native, and this was a perfect opportunity. The Azure Kinect SDK on Linux has C/C++ headers, and I could therefore use the `cinterop` tool to build Kotlin Native bindings in theory. If I could get everything to work, I would not have to write C/C++ and could write pure Kotlin and get away with it.

#### Setting up Gradle

The first step in using Kotlin Native and setting up the `cinterop` tool is setting up Gradle, and the `kotlin-multiplatform` plugin.

```
plugins {
    id 'org.jetbrains.kotlin.multiplatform' version '1.3.41'
}
repositories {
    mavenCentral()
}
kotlin {
    linuxX64("linux") {
        binaries {
            executable {
               entryPoint = 'sample.main'
               runTask?.args('')
            }
        }
    }
    sourceSets {
        linuxMain {
        }
        linuxTest {
        }
    }
}
```

The above gradle script essentially sets up the Kotlin Native toolchain, and some source folders. `sample.main` is the entry-point of the application. 

#### Setting up `cinterop`

`cinterop` is a tool which generates Kotlin Native bindings from C header files. We therefore need to define which header files to look at in a `def` file. Here is the one I defined.

```
headers = k4a/k4a.h
headerFilter = k4a/*.h
package = kinect

compilerOpts.linux = -I/usr/include -I/usr/include/x86_64-linux-gnu
linkerOpts.linux = -L/usr/lib/x86_64-linux-gnu -lk4a
```

The `headers` we are interested in to consume the Azure Kinect C SDK is `k4a.h`. I also defined a `package` name and some compiler and linker flags.

Now that we have this `def` file we now need to incorporate `cinterop` as part of our compilation toolchain. For that I made the following changes to the `gradle` file.

```
kotlin {    
    linuxX64("linux") {
        compilations.main {
            cinterops {
                kinect {
                    // The def file
                    defFile project.file("src/nativeInterop/cinterop/kinect.def")
                    // The package name to use
                    packageName "kinect"
                }
            }
        }
        // .. 
    }
    // ...
}
```

By adding this to `build.gradle` the definitions from `kotlin.def` now get included in the sourceset which gets compiled by the Kotlin Native toolchain.

Now all we need to do is run `./gradlew build`.

#### Write some Kotlin

Now that we generated Kotlin Native bindings we are now ready to write some Kotlin code which consumes the Azure Kinect SDK.
Here is some code which I wrote to test things out.

```kotlin
package sample

import kinect.*
import kotlinx.cinterop.*

@ExperimentalUnsignedTypes
fun helloKinect() {
    when (val deviceCount = k4a_device_get_installed_count()) {
        0.toUInt() -> println("No devices connected")
        else -> {
            println("No of devices connected = ($deviceCount)")
            memScoped {
                val device = alloc<k4a_device_tVar>()
                val imuSample = alloc<k4a_imu_sample_t>()
                val config = alloc<_k4a_device_configuration_t>()
                config.color_format = K4A_IMAGE_FORMAT_COLOR_MJPG
                config.camera_fps = K4A_FRAMES_PER_SECOND_30
                config.color_resolution = K4A_COLOR_RESOLUTION_720P
                config.depth_mode = K4A_DEPTH_MODE_NFOV_UNBINNED
                config.synchronized_images_only = true
                config.wired_sync_mode = k4a_wired_sync_mode_t.K4A_WIRED_SYNC_MODE_STANDALONE

                device.usePinned {
                    var result = k4a_device_open(K4A_DEVICE_DEFAULT, device.ptr)
                    if (result != K4A_RESULT_SUCCEEDED) {
                        println("Unable to connect to Kinect.")
                        return
                    }

                    result = k4a_device_start_cameras(device.value, config.ptr)
                    if (result != K4A_RESULT_SUCCEEDED) {
                        println("Unable to start cameras.")
                        return
                    }

                    result = k4a_device_start_imu(device.value)
                    if (result != K4A_RESULT_SUCCEEDED) {
                        println("Unable to start IMU.")
                        return
                    }

                    loop@ for (i in 0 until 10) {
                        result = k4a_device_get_imu_sample(
                            device.value,
                            imu_sample = imuSample.ptr,
                            timeout_in_ms = K4A_WAIT_INFINITE
                        )
                        when (result) {
                            K4A_WAIT_RESULT_SUCCEEDED -> {
                                val acceleration = imuSample.acc_sample.xyz
                                val accelerationTimeStamp = imuSample.acc_timestamp_usec
                                val gyro = imuSample.gyro_sample.xyz
                                val gyroTimestamp = imuSample.gyro_timestamp_usec
                                val temperature = imuSample.temperature
                                println("Acceleration (X - ${acceleration.x}), (Y - ${acceleration.y}), (Z - ${acceleration.z}) at $accelerationTimeStamp")
                                println("Gyro (X - ${gyro.x}), (Y - ${gyro.y}), (Z - ${gyro.z}) at $gyroTimestamp")
                                println("Temperature $temperature")
                                println()
                            }
                            K4A_WAIT_RESULT_TIMEOUT -> {
                                println("Operation timed out")
                                break@loop
                            }
                            K4A_WAIT_RESULT_TIMEOUT -> {
                                println("FFailed to collect IMU Samples")
                                break@loop
                            }
                        }
                    }
                    println("Stopping Cameras and IMU.")
                    k4a_device_stop_cameras(device.value)
                    k4a_device_stop_imu(device.value)

                    println("Closing Device.")
                    k4a_device_close(device.value)
                }
            }
        }
    }
}

@ExperimentalUnsignedTypes
fun main() = helloKinect()
```

For a complete project take a look at this [github repo](https://github.com/tikurahul/kotlin-native-kinect).

### Conclusion

Talking to native libraries from Kotlin Native is actually pretty straight-forward once you get used to the toolchain. 
I spent the majority of the time setting up the `gradle` project. Once I did that consuming the C SDK was easy.

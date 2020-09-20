Sept 29 2020, Saturday

### Path Tracing with Jetpack Compose

Ever since [Jetpack Compose](https://developer.android.com/jetpack/compose) went `alpha` I have been excited to start experimenting with the new APIs. 

One of the first demo's that blew me away and forced me to learn and explore the old graphics APIs is a series of articles written by [Romain Guy](https://twitter.com/romainguy). One article in particular which I enjoyed reading was about [Path Tracing](https://web.archive.org/web/20140805033348/http://www.curious-creature.org/2013/12/21/android-recipe-4-path-tracing/) (A novel use of [PathEffect](https://developer.android.com/reference/android/graphics/PathEffect.html)). 

I have also been watching a lot of [Frasier](https://en.wikipedia.org/wiki/Frasier) and the show has a really elegant path tracing animation. Here is what it looks like.

<iframe class="video" src="https://www.youtube.com/embed/C-SFhhnBwdA"></iframe> <br/>

I thought it might be fun to build this animation as a way to learn how to do custom drawing and animations using Compose. 

### Building the demo

##### SVG

I searched for some vector artwork that represented the path coordinates in the animation. I found an [SVG](/files/frasier.svg) that had what I needed. 

I did not want to parse SVG to get to the actual coordinates. I discovered a wonderful tool called [Coordinator](https://spotify.github.io/coordinator/) which converts SVG to XY coordinates. It was perfect for my usecase. Here are what the output `coordinates` looked like:

```json
[[40.75,851.7940063476562],[45.798627853393555,851.3941040039062],[50.20281219482422,848.9244995117188],[52.9980583190918,844.7092895507812], ...]
```

##### Custom Drawing in Compose

Now that we have the `coordinates`, we just need to draw `Path`s on the `Canvas`. To do custom drawing, we need to use the `Canvas` `@Composable`. Here is a _stub_ for the composable. 

```kotlin
// `points` are the set of points being drawn.
// `endOffset` represents the point until which the part has been animated. Starts off from the second point.
@Composable
fun PathTracer(points: List<Offset>, endOffset: Int = 2) {
    var canvasSize by remember { mutableStateOf(Size.Zero) }
    Canvas(modifier = Modifier
        .padding(2.dp)
        .background(Color.LightGray)
        .fillMaxSize()
    ) {
        if (canvasSize == Size.Zero) {
            canvasSize = size
        } else {
            // Now do the drawing.
        }
    }
}
```

The first thing we need to do is to keep track of the `size` of the `Canvas`. We need the size of the `Canvas` because we need to scale the path coordinates based on the canvas size. 

The `Canvas` size can only be determined when `Canvas` is being drawn. Therefore we need to defined a `mutableStateOf(Size)` to keep track of the `size`. Next, we scale points based on the size of the `Canvas` and create a `Path` that needs to be drawn. Here is the _full_ source code for the actual composable.

```kotlin
@Composable
fun PathTracer(points: List<Offset>, endIndex: Int = 2) {
    if (points.isNotEmpty()) {
        var canvasSize by remember { mutableStateOf(Size.Zero) }
        // minX, max X coordinate
        // This is useful to scale the screen coordinates of the points 
        // in the animation to the size of the Canvas. 
        val (minX, maxX) = remember(points) {
            val coordinates = points.asSequence().map { it.x }
            // use 0f for start because it's scales coordinates interestingly otherwise
            0f to coordinates.maxOrNull()!!
        }
        val path = remember(canvasSize, points, endIndex) {
            val path = Path()
            // We have a `size`
            if (canvasSize != Size.Zero) {
                // Margin
                val startX = 20.dp.value
                val endX = canvasSize.width - startX
                // Scale and draw points
                val first = points.first()
                val scaled = scaledOffset(first, minX, maxX, startX, endX)
                path.moveTo(scaled.x, scaled.y)
                for (i in 1 until endIndex) {
                    val point = scaledOffset(points[i], minX, maxX, startX, endX)
                    path.lineTo(point.x, point.y)
                }
            }
            path
        }
        val style = Stroke(8f)
        Canvas(
                modifier = Modifier
                        .padding(2.dp)
                        .background(Color.LightGray)
                        .fillMaxSize()
        ) {
            if (canvasSize == Size.Zero) {
                canvasSize = size
            } else {
                // Draw the path
                drawPath(path, Color.Black, style = style)
            }
        }
    }
}
```

Here is what the `scaledOffset` method looks like:

```kotlin
fun scaledOffset(
        offset: Offset,
        minX: Float,
        maxX: Float,
        canvasStart: Float,
        canvasEnd: Float
): Offset {
    val x = offset.x
    val y = offset.y
    // Keep track of the ratio's to maintain consistent aspect ratio
    val ratio = y / x
    val width = canvasEnd - canvasStart
    val nx = (x - minX) / (maxX - minX)
    val scaledX = width * nx
    val scaledY = scaledX * ratio
    return Offset(scaledX, scaledY)
}
```

That's really it. We have a full implementation of a `PathTracer` that can draw the path we want while keeping track of the `endIndex` we want to stop at.

##### Animations

All we really need to to in order to animate the `PathTracer`, is to control `endIndex`. For that we can define a `transition`. 

```kotlin
// Transition Based Animation
val OffsetKey = IntPropKey()

fun pointsTransition(size: Int) = transitionDefinition<Int> {
    state(0) {
        // initial state of animation
        // number of points = 2
        this[OffsetKey] = 2
    }
    state(1) {
        // end state
        // all points being drawn
        this[OffsetKey] = size
    }
    transition(0 to 1) {
        OffsetKey using tween(
                durationMillis = 4_000,
                easing = LinearEasing
        )
    }
}

@Composable
fun TransitionsPathTracer(points: List<Offset>) {
    val definition = remember(points) {
        pointsTransition(points.size)
    }
    val animationState = transition(definition = definition, initState = 0, toState = 1)
    PathTracer(points = points, animationState[OffsetKey])
}
```

First we build a `transitionDefinition` with an initial state and a terminal state. Here we want the animation to start off by drawing `2` points and end with *all* the points being drawn. 

Once we have the definition we use the `transition` `@Composable` to build the `TransitionState`.
We can use the `IntPropKey` to obtain the current `endIndex` while the animation is running. 

All we need to do is to pass that to the `PathTracer` `@Composable` to start the animation. 

##### Parsing coordinates

We need to parse the `JSONArray` of coordinates and pass that to the `TransitionsPathTracer`. 

```kotlin
fun parse(): List<Offset> {
    // Use a better JSON parser
    val array = JSONArray(COORDINATES)
    val points = mutableListOf<Offset>()
    for (i in 0 until array.length()) {
        val coordinate = array.optJSONArray(i)
        val x = coordinate.optDouble(0).toFloat()
        val y = coordinate.optDouble(1).toFloat()
        points += Offset(x, y)
    }
    return points
}

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PathTracerTheme {
                Surface(color = MaterialTheme.colors.background) {
                    Tracing()
                }
            }
        }
    }
}

@Composable
fun Tracing() {
    val points = remember { parse() }
    TransitionsPathTracer(points = points)
}
```

### Result

This is what it looks like. 

<p>
  <img src="/assets/images/frasier.gif" alt="Path Tracing" title="Path Tracing" width="400px" />
</p>
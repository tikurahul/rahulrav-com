September 06 2026, Monday

## Magic Move for Code Snippets from first principles

<img src="/assets/images/magic_move.webp" alt="Magic Move Demo" style="width: 64rem;" />

### Introduction

I have been using a Framework 16 as my daily driver ever since its launch. For a long time, I maintained a fragile truce dual-booting Ubuntu and Windows. But in late 2025, I finally pulled the plug, wiped both, and went all-in on **CachyOS**. Why I switched is probably worth a dedicated blog post, but the short version: I couldn't be happier. Arch / CachyOS has been an absolute breath of fresh air.

At work, my daily driver is an M5 MacBook. Lately, macOS has felt increasingly frustrating to live with. How Apple managed to trade away desktop performance in favor of `Liquid Glass` eye candy is a compromise I will never quite understand.

Moving to Linux full-time was surprisingly painless. Most tools I rely on had native Linux builds, and for the few that didn't, solid alternatives stepped in. But there was one painful sacrifice that gave me pause: **Apple Keynote** (and, more specifically, **Magic Move**).

As someone who speaks at conferences fairly often, presentation tooling isn't vanity - it's narrative scaffolding. For years, I had the luxury of leaning on Keynote to make complex technical concepts look effortless. Walking away from that workflow stung.

### Magic Move, and Its Shortcomings

Yet for all its brilliance, Magic Move has always had a glaring blind spot: **animating code snippets**.

If you've ever tried to transition between two snippets of code in Keynote, you know the horror. Keynote doesn't understand code; it understands glyphs. Watch in dismay as the `val` from line 1 flies diagonally across the slide to morph into the `al` of `calculate()`, while punctuation scrambles like alphabet soup.

To make it look professional, you're forced into brittle, unhinged workarounds: splitting lines into invisible bounding boxes, inserting transparent dummy characters, and pixel-nudging tokens by hand just to show a clean three-line refactor. You **can** make it look magical, but only through sheer brute force. Still, the payoff was real: after almost every conference talk, people would come up not to ask about the architecture, but to ask: *"How on earth did you do those cool animations?"*

Working on the [Jetpack Compose](https://developer.android.com/compose) team, a UI toolkit that is now fully [multiplatform](https://kotlinlang.org/compose-multiplatform) - this comes up constantly. In fact, it's practically an annual tradition: every Google I/O or major conference season, someone on the team inevitably stares at a mangled transition and declares: *"What if we just wrote our entire slide deck in Compose so code animates properly?"*

A few brave souls have actually done it using Compose's [Shared Element transitions](https://developer.android.com/develop/ui/compose/animation/shared-elements). I wasn't quite brave enough to abandon WYSIWYG tooling entirely - Keynote is still unmatched for layout, typography, and the parts of your presentation that are **not** code (even if Apple is slowly gatekeeping more templates behind a subscription).

### The Trigger

A couple of weeks ago on HN, there was a project called [Bento](https://github.com/nyblnet/bento) that really caught my attention. This is a fully local, offline and an extensible presentation toolkit. The project is **very slick**, and definitely worth paying attention to. Bento supports *morph* already for shapes and mathematical expressions. You can tween position, colors & even gradients. The only feature missing from my perspective was to be able to support morphing code snippets.

### Research

I decided to roll up my sleeves and see what it would take to build this. The first step in a project like this is to survey the existing literature. It turns out there is plenty, given that diffing content is a well-trodden problem. We do this every day as developers whenever we run `git diff`, for example.

The usual suspects are `Myers` and `Patience` diff, both of which compute the shortest edit distance between two sequences. There have also been previous attempts at this problem by members of the Kotlin / Android community (such as [Re-creating Magic Move with Compose](https://www.youtube.com/watch?v=PgzBWebeJsk)).

### Intuition: When Math Makes for Bad Animations

Having looked at past attempts, my intuition was that `Myers` diff was solving the wrong problem for this use case.

Myers diff is mathematically elegant: it finds the *shortest sequence of edits* to turn String A into String B. But the mathematically optimal diff often makes for a visually jarring animation. If a variable is renamed or moved, Myers might choose to delete three characters here, insert two there, and slice an identifier in half because it saves a single edit step.

In an animation, human perception matters far more than minimal edit distance. You don't want minimal operations; you want **visual continuity**. You want tokens to glide smoothly to their new positions or fade away gracefully.

That led me to a 1978 paper by Paul Heckel: [A technique for isolating differences between files](https://dl.acm.org/doi/10.1145/359460.359467) (*Communications of the ACM*, Volume 21, Issue 4, **1978**). This paper approached diffing from a completely different perspective. The algorithm runs in `O(n)` time and feels tailor-made for animations. Given my familiarity with Kotlin and Jetpack Compose, I decided to experiment with adapting this paper to compute differences between two *token streams*, rather than treating code snippets as plain text.

### Defining what to `diff`

Our first step is to use a tokenizer to convert the code snippet into a token stream.

When thinking about tokenizing code, the immediate instinct is often: *"Let's build/use an AST."*

But, an AST is a trap for code snippets because:

* We want to support multiple programming languages without bundling a heavy parsers / compiler infrastructure.
* Code snippets are inherently messy. Speakers frequently use partial snippets, omit imports or trailing braces, and lean on pseudo-code that would cause a strict parser to blow up.

Instead, what we want is a general representation of what tokens and fragments mean. Text editors face the exact same challenge: they need fast, fault-tolerant syntax highlighting across dozens of languages. One of the many ways that they solve this is using **TextMate grammars**. Originally designed for `TextMate` (the legendary macOS text editor), this format was later adopted by Sublime Text, Visual Studio Code, and Eclipse, making it a de facto industry standard.

This grammar is effectively a prioritized list of regular expressions that can identify each token and assign it a `scope`. So, if you have a snippet that looks something like:

```kotlin
val x = 10
print(x)
```

The token stream looks something like:

```
Token(content='val', scopes='[source.kotlin, storage.type.kotlin]', lineNumber=0, startIndex=0, endIndex=3)
Token(content=' x ', scopes='[source.kotlin]', lineNumber=0, startIndex=3, endIndex=6)
Token(content='=', scopes='[source.kotlin, keyword.operator.assignment.kotlin]', lineNumber=0, startIndex=6, endIndex=7)
Token(content=' ', scopes='[source.kotlin]', lineNumber=0, startIndex=7, endIndex=8)
Token(content='10', scopes='[source.kotlin, constant.numeric.integer.kotlin]', lineNumber=0, startIndex=8, endIndex=10)
Token(content='print', scopes='[source.kotlin, support.function.kotlin]', lineNumber=1, startIndex=0, endIndex=5)
Token(content='(', scopes='[source.kotlin, meta.group.kotlin, punctuation.section.group.begin.kotlin]', lineNumber=1, startIndex=5, endIndex=6)
Token(content='x', scopes='[source.kotlin, meta.group.kotlin]', lineNumber=1, startIndex=6, endIndex=7)
Token(content=')', scopes='[source.kotlin, meta.group.kotlin, punctuation.section.group.end.kotlin]', lineNumber=1, startIndex=7, endIndex=8)
```

The `Token` class can be represented by something like:

```kotlin
class Token(
    /** The actual content of the parsed token. */
    val content: String,
    val scopes: List<String>,
    val lineNumber: Int,
    val startIndex: Int,
    val endIndex: Int
) {
	// ...
}
```

`TextMate` scopes give us the full picture of what a `Token` represents. In our example, the first scope is always the root (`source.kotlin`), signaling that we are looking at Kotlin source code. The *last* scope in the list tells us the specific role the token plays (e.g. `storage.type.kotlin` or `constant.numeric.integer.kotlin`). TextMate defines a comprehensive hierarchy of standard scopes, which is how text editors decide what color to paint each token.

#### Structural similarity

As we diff the sequence of `Token`s to produce a great Magic Move effect, it becomes clear that line numbers and character offsets shouldn't dictate structural identity. Tokens are free to move across lines-and during a presentation showing a refactor, they frequently do.

The traits that truly define a `Token` when diffing are its `content`, its primary `scope` (the last entry in the list), and its `depth` (i.e. `scopes.size`). The depth provides structural insights-distinguishing, for instance, a token at `top-level` scope from one that is nested deeply inside a function body.

So our `Token` class actually becomes:

```kotlin
class Token(
    /** The actual content of the parsed token. */
    val content: String,
    /** The primary scope */
    val scope: String,
    /** The depth of the primary scope. */
    val depth: Int,
    /* More context for animations (but NOT structural similarity). */
    val lineNumber: Int,
    val startIndex: Int,
    val endIndex: Int
) {
	// ...
}
```

### The Heckel Diff Algorithm

#### 1. Finding Anchors (Islands of Certainty)

At its core, the Heckel diff algorithm is simple. The first goal is to find *anchors* - tokens that appear **exactly once** in both the `previous` and `current` sequences. If a token only occurs once in both snippets, we can be confident that it represents the exact same token before and after the transformation.

Consider two snippets: `previous` and the transformed `current`.

```kotlin
// Previous
val x = 10
```

produces,

```
Token(content='val', scope='storage.type.kotlin', depth=2, lineNumber=0, startIndex=0, endIndex=3)
Token(content=' x ', scope='source.kotlin', depth=1, lineNumber=0, startIndex=3, endIndex=6)
Token(content='=', scope='keyword.operator.assignment.kotlin', depth=2, lineNumber=0, startIndex=6, endIndex=7)
Token(content=' ', scope='source.kotlin', depth=1, lineNumber=0, startIndex=7, endIndex=8)
Token(content='10', scope='constant.numeric.integer.kotlin', depth=2, lineNumber=0, startIndex=8, endIndex=10)
```

and:

```kotlin
// Current
val x = 20
```

produces,

```
Token(content='val', scope='storage.type.kotlin', depth=2, lineNumber=0, startIndex=0, endIndex=3)
Token(content=' x ', scope='source.kotlin', depth=1, lineNumber=0, startIndex=3, endIndex=6)
Token(content='=', scope='keyword.operator.assignment.kotlin', depth=2, lineNumber=0, startIndex=6, endIndex=7)
Token(content=' ', scope='source.kotlin', depth=1, lineNumber=0, startIndex=7, endIndex=8)
Token(content='20', scope='constant.numeric.integer.kotlin', depth=2, lineNumber=0, startIndex=8, endIndex=10)
```

Every token in both lists except for the last constant (`10` vs `20`) occurs **only once**, so they become our anchors and **share the same identity**.

#### 2. Forward Pass (Marching forward)

Once we have our anchors pinned down, we look at their immediate neighbors.
For each anchor, we check if the token immediately following it in `current` (`currentIdx + 1`) matches the token immediately following it in `previous` (`previousIdx + 1`) sequence. If they match, they are paired up. We continue walking forward until the tokens diverge.

#### 3. Backward Pass (Marching backward)

Next, we do the forward pass in reverse. Starting from our anchors, we check offsets `currentIdx - 1` and `previousIdx - 1`. If the preceding tokens match, we pair them up and keep walking backward.

#### 4. Final Pass

By the end of these passes, all surviving and repositioned tokens have been matched. Whatever remains unmatched in `previous` is marked as a **deleted** token, and whatever remains unmatched in `current` is marked as an **inserted** token.

### A *slightly* more complicated example

If you have:

```kotlin
// Previous
val x = 10
fun convert(input: Int) {
  // ...
}
```

and :

```kotlin
val x = 10
fun convert(input: Int) {
  println("The actual implementation")
}
```

The actual changes look like:

```
Match(previous=Token(content='val', scope='storage.type.kotlin', depth=2, lineNumber=0, startIndex=0, endIndex=3), previousIdx=0, current=Token(content='val', scope='storage.type.kotlin', depth=2, lineNumber=0, startIndex=0, endIndex=3), currentIdx=0)
// ...
Match(previous=Token(content='  ', scope='meta.block.kotlin', depth=3, lineNumber=2, startIndex=0, endIndex=2), previousIdx=16, current=Token(content='  ', scope='meta.block.kotlin', depth=3, lineNumber=2, startIndex=0, endIndex=2), currentIdx=16)
Delete(token=Token(content='//', scope='comment.line.double-slash.kotlin', depth=5, lineNumber=2, startIndex=2, endIndex=4), index=17)
Delete(token=Token(content=' ...', scope='punctuation.definition.comment.kotlin', depth=4, lineNumber=2, startIndex=4, endIndex=8), index=18)
Insert(token=Token(content='println', scope='support.function.kotlin', depth=4, lineNumber=2, startIndex=2, endIndex=9), index=17)
Insert(token=Token(content='(', scope='punctuation.section.group.begin.kotlin', depth=5, lineNumber=2, startIndex=9, endIndex=10), index=18)
Insert(token=Token(content='"', scope='punctuation.definition.string.begin.kotlin', depth=6, lineNumber=2, startIndex=10, endIndex=11), index=19)
Insert(token=Token(content='The actual implementation', scope='string.quoted.double.kotlin', depth=5, lineNumber=2, startIndex=11, endIndex=36), index=20)
Insert(token=Token(content='"', scope='punctuation.definition.string.end.kotlin', depth=6, lineNumber=2, startIndex=36, endIndex=37), index=21)
Insert(token=Token(content=')', scope='punctuation.section.group.end.kotlin', depth=5, lineNumber=2, startIndex=37, endIndex=38), index=22)
Match(previous=Token(content='}', scope='punctuation.section.group.end.kotlin', depth=4, lineNumber=3, startIndex=0, endIndex=1), previousIdx=19, current=Token(content='}', scope='punctuation.section.group.end.kotlin', depth=4, lineNumber=3, startIndex=0, endIndex=1), currentIdx=23)
```

You can see that tokens match cleanly across both sequences right up to the block body.

We `Delete` the comment tokens (`//` and ` ...`) and `Insert` the new `println(...)` call. Crucially, the trailing `}` matches cleanly because it served as an anchor point at the end of the block.

> **Pro-tip for smooth animations:** If you animate deletions token-by-token independently, the animations look unorchestrated. In our implementation contiguous deleted tokens are **batched together** so they fade out in unison, while newly inserted tokens fade in smoothly. Anchored tokens glide gracefully to their new coordinates. The result feels cohesive and cinematic rather than chaotic.

### Source Code

The full implementation is available at [https://github.com/tikurahul/warp](https://github.com/tikurahul/warp).

### Epilogue

I also managed to contribute to [Bento](https://github.com/nyblnet/bento). Bento release `1.0.19` includes the ability to morph code snippets.

Here is the link to my [pull request](https://github.com/nyblnet/bento/pull/259).

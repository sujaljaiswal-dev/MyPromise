# mini-promise

I built this to actually understand Promises instead of just using `.then()` on autopilot like I'd been doing for months. Turns out there's a surprising amount going on underneath — a state machine, a callback queue, microtask scheduling, error propagation rules — and none of it clicks until you build it yourself and watch it break.

This is a from-scratch clone of JS's native `Promise`. Same idea as the mini Express framework I built before this (middleware stack + `.Router()`) — I like understanding what's actually happening under the tools I use every day, not just using them.

## Why I built this

You can write async JS for years and never really know why `.then()` runs when it runs, or why a `setTimeout(fn, 0)` always loses to a resolved promise. I wanted to actually get that, at a level where I could explain it, not just recognize the syntax. So I built the whole thing piece by piece — state, `.then()`, chaining, error handling, timing — and debugged every single bug myself instead of copying a working version off the internet.

## What it can do

### The state machine

Three states — `pending`, `Fulfilled`, `Rejected` — and once a promise leaves `pending`, it's locked in forever. Calling `resolve` or `reject` again after that just does nothing, same as the real thing. The executor function runs immediately when you create the promise, exactly like native Promises.

### `.Mythen(onFulfilled, onRejected)`

This is the core of the whole thing. It works whether the promise is already done (runs your callback right away) or still pending (stores it and waits). Every call returns a **brand new promise**, which is what makes chaining actually work and stops two unrelated `.Mythen()` calls on the same promise from stepping on each other. If your callback returns _another_ promise instead of a plain value, it automatically waits for that one too before moving on — which took me a while to wrap my head around, but makes sense once you see it as just reusing `.Mythen()` recursively.

### Error handling that actually behaves like the real thing

- If nobody handles a rejection, it doesn't just vanish or quietly become a success — it keeps flowing down the chain as a rejection until something finally catches it
- If a `.catch()`-style handler runs fine and returns a normal value, the chain recovers and goes back to being "successful" — same as real `.then().catch()` behavior
- If a handler throws (on purpose or by accident), that failure correctly becomes the next promise's rejection

### `.MyCatch(onRejected)`

Basically just `.Mythen(undefined, onRejected)` with a nicer name. Nothing fancy, but it needed to exist.

### `.Myfinally(fn)`

Runs your cleanup function no matter what happened — success or failure — and doesn't touch the actual value or error passing through it. Works stuck in the middle of a chain or at the very end, sync or async.

### Two bugs I only found after digging deeper

Once the "happy path" worked, I compared it against how real Promises behave and found two real gaps:

- **A throwing executor used to crash everything.** Now it correctly turns into a rejected promise instead, same as native.
- **Timing was inconsistent.** If a promise was already settled, my `.Mythen()` used to run the callback immediately — but if it was still pending, it ran later. Same method, two different timings depending on luck. Real Promises never do that; they always defer, even for already-settled promises. Fixed it using `queueMicrotask` so it's consistent now, no matter what.

## How I actually built it

I went through this roughly in order, testing each part before moving to the next one:

1. Basic class shape + constructor (get the executor running first)
2. `resolve()` / `reject()` with the "only settle once" rule
3. `.Mythen()` for promises that are already done
4. A queue for `.Mythen()` calls made while still pending
5. Actual chaining — returning a new promise, and unwrapping nested promises
6. `.MyCatch()` and `.Myfinally()`
7. Going back and fixing the two correctness issues above

Almost every stage had a real bug I had to find myself — indexing into an array wrong, a constructor that crashed because I forgot a default parameter, mixing up `result` and `err` inside a catch block, forgetting to actually run the cleanup function in one branch of `.Myfinally()`. None of it was handed to me pre-solved, which honestly made it stick way better than just reading how Promises work.

## What's still missing compared to the real thing

- No `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`, or `Promise.resolve`/`Promise.reject` yet — these are next
- Only recognizes promises made from my own class — a real Promise or some other library's promise wouldn't get unwrapped correctly
- The queue-draining function uses recursion, so a truly massive number of chained callbacks could theoretically blow the stack (not something that'll happen in normal use)
- No warning system for rejections nobody ever handles — native JS actually complains about that, mine just stays silent

## How to use it

```js
const MyPromise = require("./MyPromise");

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("done"), 100);
});

p.Mythen((val) => val.toUpperCase())
  .Myfinally(() => console.log("cleanup"))
  .Mythen((val) => console.log("result:", val))
  .MyCatch((err) => console.log("error:", err));
```

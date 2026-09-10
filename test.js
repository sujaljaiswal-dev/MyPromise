const MyPromise = require("./Promises");
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject("fAILED");
//   }, 1000);
// }).Mythen(
//   (data) => {
//     console.log(data);
//   },
//   (data) => {
//     console.log(data);
//   },
// );
// Test 1: resolve with no .Mythen() ever attached
// const p1 = new MyPromise((resolve) => resolve("hello"));
// console.log(p1.state);

// // Test 2: .Mythen() called AFTER already resolved
// const p2 = new MyPromise((resolve) => resolve("hi"));
// p2.Mythen((val) => console.log("p2:", val));

// // Test 3: multiple .Mythen() calls while still pending (the real test)
// const p3 = new MyPromise((resolve) => {
//   setTimeout(() => resolve("done"), 500);
// });
// p3.Mythen((val) => console.log("first:", val));
// p3.Mythen((val) => console.log("second:", val));
// p3.Mythen((val) => console.log("third:", val));

// // Test 4: rejection path
// const p4 = new MyPromise((resolve, reject) => {
//   setTimeout(() => reject("oops"), 300);
// });
// p4.Mythen(
//   (val) => console.log("won't run"),
//   (err) => console.log("caught:", err),
// )

// test for the try catch block
// const p = new MyPromise((resolve, reject) => reject("network error"));
// const p2 = p.Mythen(
//   (val) => val,
//   (err) => "recovered from: " + err, // handles error, returns normally
// );
// p2.Mythen((val) => console.log("p2 got:", val));

// const p3 = p.Mythen(
//   (val) => val,
//   (err) => {
//     throw new Error("still broken");
//   }, // handler itself throws
// );
// p3.Mythen(
//   (val) => console.log("p3 resolved:", val),
//   (err) => console.log("p3 rejected:", err.message),
// );

//test for Mycatch()
// const p = new MyPromise((resolve, reject) => reject("original failure"));

// p.Mythen((val) => val * 2) // only OnFulfilled passed, no OnRejected
// .MyCatch((err) => console.log("caught:", err));
// resolved chain, no rejection anywhere
// const p2 = new MyPromise((resolve) => resolve(10));
// p2.Mythen((val) => val * 2).MyCatch((err) => console.log("should NOT print"));

// // handler recovers from error
// const p3 = new MyPromise((resolve, reject) => reject("network error"));
// const p4 = p3.Mythen(
//   (val) => val,
//   (err) => "recovered from: " + err,
// );
// p4.Mythen((val) => console.log("p4 got:", val));

// // handler itself throws
// const p5 = p3.Mythen(
//   (val) => val,
//   (err) => {
//     throw new Error("still broken");
//   },
// );
// p5.Mythen(
//   (val) => console.log("p5 resolved:", val),
//   (err) => console.log("p5 rejected:", err.message),
// );

//for finally
// 1. Basic finally on success
// const p1 = new MyPromise((resolve) => resolve(100));
// p1.Myfinally(() => console.log("cleanup 1")).Mythen((val) =>
//   console.log("p1 final:", val),
// );

// // 2. Finally in the middle of a chain
// const p2 = new MyPromise((resolve) => resolve(5));
// p2.Mythen((val) => val * 2)
//   .Myfinally(() => console.log("cleanup 2"))
//   .Mythen((val) => console.log("p2 final:", val));

// // 3. Finally on a rejected promise
// const p3 = new MyPromise((resolve, reject) => reject("boom"));
// p3.Myfinally(() => console.log("cleanup 3")).MyCatch((err) =>
//   console.log("p3 caught:", err),
// );

// // 4. Finally with async setTimeout
// const p4 = new MyPromise((resolve) => setTimeout(() => resolve("done"), 100));
// p4.Myfinally(() => console.log("cleanup 4")).Mythen((val) =>
//   console.log("p4 final:", val),
// );

//for constructor try & catch
// const p = new MyPromise((resolve, reject) => {
//   throw new Error("executor blew up");
// });
// // console.log(p.state);

// p.MyCatch((err) => console.log("caught:", err.message));

//the function thats lets you put yor fn inside the microtask queue
// console.log("1");
// queueMicrotask(() => console.log("2 - microtask"));
// setTimeout(() => console.log("3 - macrotask"), 0);
// console.log("4");

// const p = new MyPromise((resolve) => {
//   setTimeout(() => resolve("done"), 100);
// });
// p.Mythen((val) => console.log("first:", val));
// p.Mythen((val) => console.log("second:", val));
// p.Mythen((val) => console.log("third:", val));
// console.log("hello");

// const p2 = new MyPromise((resolve) => resolve("instant"));
// console.log("before .Mythen()");
// p2.Mythen((val) => console.log("inside .Mythen():", val));
// console.log("after .Mythen()");

//testing the real .all promise
// Test 1: basic success case — order preserved despite different timings
// const p1 = new Promise((resolve) => setTimeout(() => resolve("first"), 300));
// const p2 = new Promise((resolve) => setTimeout(() => resolve("second"), 100));
// const p3 = new Promise((resolve) => setTimeout(() => resolve("third"), 200));

// Promise.all([p1, p2, p3]).then((results) => {
//   console.log("Test 1 results:", results);
//   // even though p2 finishes first (100ms), then p3 (200ms), then p1 (300ms),
//   // the output array order should match the INPUT order: [first, second, third]
// });

// // Test 2: one rejection — should reject immediately, not wait for the others
// const p4 = new Promise((resolve) => setTimeout(() => resolve("ok"), 300));
// const p5 = new Promise((resolve, reject) =>
//   setTimeout(() => reject("boom"), 50),
// );
// const p6 = new Promise((resolve) => setTimeout(() => resolve("also ok"), 400));

// Promise.all([p4, p5, p6])
//   .then((results) => console.log("Test 2 results:", results))
//   .catch((err) => console.log("Test 2 rejected with:", err));
// // should print the rejection almost immediately (~50ms), NOT wait 400ms for p6

// // Test 3: mixing plain values with promises — Promise.all should handle both
// Promise.all([
//   42,
//   Promise.resolve("hello"),
//   new Promise((r) => setTimeout(() => r("delayed"), 100)),
// ]).then((results) => console.log("Test 3 results:", results));

// // Test 4: empty array — what does it resolve with?
// Promise.all([]).then((results) =>
//   console.log("Test 4 (empty array):", results),
// );
// console.log("firstttttt");

// const MyPromise = require("./MyPromise"); // adjust path to your file

// const p = new MyPromise((resolve) => resolve("outer ok"));

// const inner = new MyPromise((resolve, reject) =>
//   setTimeout(() => reject("inner failed"), 100),
// );

// const outer = p.Mythen((val) => inner); // success handler returns `inner`, a promise that will reject later

// outer.MyCatch((err) => console.log("caught:", err));

// console.log("test running...");
// try {
//   setTimeout(() => {
//     throw new Error("boom"); // this runs LATER, not while try is executing
//   }, 1000);
// } catch (err) {
//   console.log("caught:", err.message); // this will NEVER run
// }

//test for my Prmoise.all
// const MyPromise = require("./MyPromise");

// Test 1: order preserved despite different timings
// const p1 = new MyPromise((resolve) => setTimeout(() => resolve("first"), 300));
// const p2 = new MyPromise((resolve) => setTimeout(() => resolve("second"), 100));
// const p3 = new MyPromise((resolve) => setTimeout(() => resolve("third"), 200));

// MyPromise.all([p1, p2, p3]).Mythen((results) => {
//   console.log("Test 1 results:", results);
// });

// // Test 2: one rejection — should reject almost immediately, not wait for the rest
// const p4 = new MyPromise((resolve) => setTimeout(() => resolve("ok"), 300));
// const p5 = new MyPromise((resolve, reject) =>
//   setTimeout(() => reject("boom"), 50),
// );
// const p6 = new MyPromise((resolve) =>
//   setTimeout(() => resolve("also ok"), 400),
// );

// MyPromise.all([p4, p5, p6]).Mythen(
//   (results) => console.log("Test 2 results:", results),
//   (err) => console.log("Test 2 rejected with:", err),
// );

// // Test 3: empty array
// MyPromise.all([]).Mythen((results) =>
//   console.log("Test 3 (empty array):", results),
// );

//code for original race

// Test 1: fastest one wins, resolves
// const p1 = new Promise((resolve) => setTimeout(() => resolve("slow"), 300));
// const p2 = new Promise((resolve) => setTimeout(() => resolve("fast"), 100));
// const p3 = new Promise((resolve) => setTimeout(() => resolve("medium"), 200));

// Promise.race([p1, p2, p3]).then((winner) => {
//   console.log("Test 1 winner:", winner);
//   // should print "fast" at ~100ms, ignoring p1 and p3 entirely
// });

// // Test 2: fastest one rejects — race should reject too
// const p4 = new Promise((resolve) =>
//   setTimeout(() => resolve("slow success"), 300),
// );
// const p5 = new Promise((resolve, reject) =>
//   setTimeout(() => reject("fast failure"), 50),
// );

// Promise.race([p4, p5])
//   .then((val) => console.log("Test 2 resolved:", val))
//   .catch((err) => console.log("Test 2 rejected with:", err));
// // should reject with "fast failure" at ~50ms, never touching p4's eventual success

// // Test 3: what happens to the LOSING promises — do they still run, even though nobody's listening?
// const p6 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("p6 finished (the loser) — does this line even run?");
//     resolve("p6 done");
//   }, 500);
// });
// const p7 = new Promise((resolve) => setTimeout(() => resolve("p7 wins"), 50));

// Promise.race([p6, p7]).then((winner) => console.log("Test 3 winner:", winner));
// // wait a full second before checking your terminal, to see if p6's console.log ever fires

// // Test 4: empty array — what happens?
// Promise.race([]).then(
//   (val) => console.log("Test 4 resolved:", val),
//   (err) => console.log("Test 4 rejected:", err),
// );
// setTimeout(
//   () =>
//     console.log(
//       "Test 4 — 2 seconds later, still nothing happened above? that tells you something",
//     ),
//   2000,
// );

//My .Myrace
// const MyPromise = require('./MyPromise');

// Test 1: fastest wins
// const p1 = new MyPromise((resolve) => setTimeout(() => resolve("slow"), 300));
// const p2 = new MyPromise((resolve) => setTimeout(() => resolve("fast"), 100));
// const p3 = new MyPromise((resolve) => setTimeout(() => resolve("medium"), 200));

// MyPromise.Myrace([p1, p2, p3]).Mythen((winner) =>
//   console.log("Test 1 winner:", winner),
// );

// // Test 2: fastest rejects
// const p4 = new MyPromise((resolve) =>
//   setTimeout(() => resolve("slow success"), 300),
// );
// const p5 = new MyPromise((resolve, reject) =>
//   setTimeout(() => reject("fast failure"), 50),
// );

// MyPromise.Myrace([p4, p5]).Mythen(
//   (val) => console.log("Test 2 resolved:", val),
//   (err) => console.log("Test 2 rejected with:", err),
// );

// // Test 3: losing promise still runs its own code afterward
// const p6 = new MyPromise((resolve) => {
//   setTimeout(() => {
//     console.log("p6 finished (the loser)");
//     resolve("p6 done");
//   }, 500);
// });
// const p7 = new MyPromise((resolve) => setTimeout(() => resolve("p7 wins"), 50));

// MyPromise.Myrace([p6, p7]).Mythen((winner) =>
//   console.log("Test 3 winner:", winner),
// );

// // Test 4: empty array — should just hang, pending forever, matching native behavior
// MyPromise.Myrace([]).Mythen(
//   (val) => console.log("Test 4 resolved:", val),
//   (err) => console.log("Test 4 rejected:", err),
// );
// console.log(
//   "Test 4 — nothing above should print immediately, and nothing ever should",
// );

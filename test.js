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

const p2 = new MyPromise((resolve) => resolve("instant"));
console.log("before .Mythen()");
p2.Mythen((val) => console.log("inside .Mythen():", val));
console.log("after .Mythen()");

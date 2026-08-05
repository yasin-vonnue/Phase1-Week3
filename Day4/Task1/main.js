// Example: 1

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

// Prediction: A,C,B

//Example: 2

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

//Prediction: Start, End, Promise

//Example: 3

console.log("1");

queueMicrotask(() => {
  console.log("2");
});

console.log("3");

//Prediction: 1,3,2

//Example: 4

console.log("A");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("B");

// Prediction: A, Promise, B, Timeout (wrong prediction)
// Correct outpout: A, B, Promise, Timeout

//Explanation: Call Stack: A, B
//             Microtask Queue: Promise
//             Task Queue: Timeout
// Microtasks always run first

//Example: 5

console.log("X");

queueMicrotask(() => {
  console.log("Microtask");
});

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("Y");

//Prediction: X, Y, Microtask, Timeout

//Example: 6

console.log("1");

Promise.resolve().then(() => {
  console.log("2");
});

queueMicrotask(() => {
  console.log("3");
});

console.log("4");

//Prediction: 1,4,3,2 (wrong prediction)

//Correct output: 1, 4, 2, 3

//Explanation: Call Stack: 1, 4
//             Microtask Queue: Promise callback first, then queueMicrotask
//             Both are microtasks and execute in the order they were added.

//Example: 6

setTimeout(() => {
  console.log("A");
}, 0);

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

//Prediction: C, A, B

//Example 8:

console.log("Hello");

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("Timer");
}, 0);

queueMicrotask(() => {
  console.log("Microtask");
});

//Prediction: Hello, Promise, Microtask, Timer

//Example: 9

console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
});

console.log("D");

//Prediction: A, D, C, B (wrong prediction)

//Correct Output: A, D, B, C

//Explanation:  Call Stack; A, D
//              Microtask Queue: First Promise(B)
// while running B, another microtask (C) is added.
// The new microtask runs before moving to the task queue.

//Example: 10

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("Finish");

//Prediction: Start, Finish, Promise, Microtastk, Timeout

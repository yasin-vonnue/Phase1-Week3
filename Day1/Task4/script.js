function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    },
    reset() {
      count = 0;
    },
  };
}

const counter = createCounter();

counter.increment();
counter.increment();
console.log(counter.getCount());
counter.decrement();
console.log(counter.getCount());
counter.reset();
console.log(counter.getCount());

// memoize()

function memoize(fn) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn.call(this, arg);
    cache.set(arg, result);
    return result;
  };
}

function slowFibonacci(n) {
  if (n == 0 || n == 1) return n;

  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

const memoizedFibonacci = memoize(slowFibonacci);

console.time("First Call");
console.log(`Result 1: ${memoizedFibonacci(40)}`);
console.timeEnd("First Call");

console.time("Second Call");
console.log(`Result 2: ${memoizedFibonacci(40)}`);
console.timeEnd("Second Call");

//once(fn)

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

let count = 0;
function fun() {
  count++;
  console.log("Hello World!");
  return count;
}

const initialize = once(fun);

console.log("First call: ", initialize());
console.log("Second call:", initialize());
console.log("Third call: ", initialize());

//Rate limiter

function createRateLimiter(fn, maxCalls, windowMs) {
  let callCount = 0;

  setInterval(() => {
    callCount = 0;
  }, windowMs);

  return function (...args) {
    if (callCount >= maxCalls) {
      throw new Error("Rate limit exceeded!");
    }

    callCount++;
    return fn.apply(this, args);
  };
}

const greetings = () => console.log("Hi!");
const limitedGreetings = createRateLimiter(greetings, 2, 1000);

try {
  limitedGreetings();
  limitedGreetings();
  limitedGreetings();
} catch (e) {
  console.log("Rate limit: : ", e.message);
}

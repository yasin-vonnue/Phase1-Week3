"use strict";

//Default Binding(Standalone Function)

function showDefault() {
  console.log("Default Binding:", this);
}

showDefault();

//Implicit Binding (Method Call)

const person = {
  name: "John",

  greet() {
    console.log("Implicit Binding:", this.name);
  },
};

person.greet();

//Explicit Binding(call,apply,bind)

function introduce(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

const user = { name: "Alice" };

introduce.call(user, "Dubai", "UAE");
introduce.apply(user, ["London", "UK"]);

const boundFn = introduce.bind(user, "Tokyo", "Japan");
boundFn();

function Animal(name) {
  this.name = name;
}

Animal.prototype.show = function () {
  console.log("New Binding:", this.name);
};
const dog = new Animal("Buddy");
dog.show();

//this-loss

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log("Count:", this.count);
  }
}

const counter = new Counter();

counter.increment();

const fn = counter.increment;

try {
  fn();
} catch (err) {
  console.log("this-loss:", err.message);
}

//Fix 1: bind()

const boundIncrement = counter.increment.bind(counter);

boundIncrement();
boundIncrement();

//Fix 2: Arrow Function in Constructor

class CounterArrowConstructor {
  constructor() {
    this.count = 0;

    this.increment = () => {
      this.count++;
      console.log("Arrow Constructor:", this.count);
    };
  }
}

const c1 = new CounterArrowConstructor();

const lost1 = c1.increment;

lost1();
lost1();

//Fix 3: Class Field Arrow Function

class CounterClassField {
  count = 0;

  increment = () => {
    this.count++;
    console.log("Class Field:", this.count);
  };
}

const c2 = new CounterClassField();

const lost2 = c2.increment;

lost2();
lost2();

//bindAll(obj)

function bindAll(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "function") {
      obj[key] = obj[key].bind(obj);
    }
  }
}

const calculator = {
  value: 10,

  add(x) {
    console.log(this.value + x);
  },

  subtract(x) {
    console.log(this.value - x);
  },
};

bindAll(calculator);

const add = calculator.add;
const subtract = calculator.subtract;

add(5);
subtract(3);

// Arrow Class Field + setTimeout

class Timer {
  count = 0;

  tick = () => {
    this.count++;
    console.log("Timer:", this.count);
  };

  start() {
    setTimeout(this.tick, 1000);
    setTimeout(this.tick, 2000);
    setTimeout(this.tick, 3000);
  }
}

const timer = new Timer();

timer.start();

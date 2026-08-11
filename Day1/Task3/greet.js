//Function Declaration

function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet("Jack"));

//Function Expression

const greetExpression = function (name, greeting = "Hello") {
  return `${greeting},${name}!`;
};

console.log(greetExpression("John"));

//Arrow Function

const greetArrow = (name, greeting = "Hello") => `${greeting}, ${name}!`;

console.log(greetArrow("Jim"));

//Function Object

const greeter = {
  greet(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
  },
};

console.log(greeter.greet("Johny"));

//Calculator Object

const calculator = {
  add(num1, num2) {
    return num1 + num2;
  },
  subtract(num1, num2) {
    return num1 - num2;
  },
  multiply(num1, num2) {
    return num1 * num2;
  },
  divide(num1, num2) {
    if (num2 == 0) {
      return "Invalid operation: Division by zero";
    }
    return num1 / num2;
  },
};

console.log(calculator.add(2, 10));
console.log(calculator.subtract(10, 5));
console.log(calculator.multiply(3, 20));
console.log(calculator.divide(2, 0));
console.log(calculator.divide(10, 2));

//Factory returning a function

function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

console.log(createMultiplier(3)(7));

//arguments object vs rest parameters

function func1(a, b, c) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

func1(1, 2, 3);

function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

//Arrow functions do not have their own local arguments object because they lexically bind their execution environment

//Global Scope Behavior

// const showArgs = () => {
//     //Throws ReferenceError: arguments is not defined
//     console.log(arguments);
// };

// showArgs("apple","banana");

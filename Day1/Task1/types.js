console.log(typeof null); //the value will be object

console.log(typeof []); //the value will be object

console.log(typeof {}); //the value will be object

console.log(typeof NaN); //the value will be NaN. Prediction wrong, explanation: it returns "number",
//because NaN is a specific numeric data type used to represent an unrepresentable or invalid mathematical result.

console.log(typeof function () {}); //the value will be undefined. Prediction wrong, explanation: while functions are
//technically standard JavaScript objects under the hood, the language separates regular objects from "callable objects"
//to make type-checking much more practical.(The correct value is function)

console.log(typeof (0 == false)); //the value will be boolean

console.log(typeof ("" == false)); //the value will be boolean

console.log(typeof (null == undefined)); //the value will be boolean

console.log(typeof (null === undefined)); //the value will be boolean

console.log(typeof (NaN === NaN)); //the value will be boolean

console.log(typeof (1 + "2")); //the value will be string

console.log(typeof ("3" - 1)); //the value will be undefined. Prediction wrong, explanation: because JS automatically
//converts the string "3" into the number 3 before performing the subtraction. This behavior is known as implicit type coercion.

console.log(typeof (true + true)); //the value will be number

console.log(typeof ([] + [])); //the value will be object. Prediction wrong, explanation: evaluating typeof [] + [] result in
// the string "object[object object]" because of operator precedence and automatic type coercion.(the correct value is string)

console.log(typeof ([] + {})); //the value will be object. Prediction wrong, explanation: evaluating typeof {} + {} result in
// the string "object[object object]" because of operator precedence and automatic type coercion.(the correct value is string)

//primitive values

console.log(typeof "Hello"); // string

console.log(typeof 42); // number

console.log(typeof true); // boolean

console.log(typeof undefined); //undefined

console.log(typeof 9007199254740991n); //bigint

console.log(typeof Symbol("id")); //symbol

console.log(typeof null); //object

console.log(typeof function () {}); //function

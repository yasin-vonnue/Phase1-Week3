//pair1

console.log(greeting);
var greeting = "hello!";
//Output: undefined

// console.log(greetings);
// let greetings = "hello!";
// Output: ReferenceError: Cannot access 'greetings' before initialization

//pair2

if (true) {
  var role = "Admin";
}
console.log(role);
//Output: Admin

// if (true) {
//   let Role = "Admin";
// }
// console.log(Role);
//Output: ReferenceError: Role is not defined

//pair3

for (var i = 0; i < 3; i++) {}
console.log(i);
//output will 3

// for (let j = 0; j < 3; j++) {}
// console.log(i);
//Output: ReferenceError: j is not defined

//pair4

var status = "Pending";
var status = "Completed";

console.log(status);
//Output: Completed

// let status = "Pending";
// let status = "Completed";
// console.log(status);
//Output: SyntaxError: Identifier 'status' has already been declared

//pair5
var apiSecret = "12345";
console.log(window.apiSecret);
//Output: 12345

let apiSecrets = "12345";
console.log(window.apiSecrets);
//Output: undefined
//global variables instantiated with let and const occupy a separate declarative environment record rather than binding
//as properties on the global object context.

//demonstration of temporal dead zone

// console.log(greetings);
// let greetings = "hello!";
// Output: ReferenceError: Cannot access 'greetings' before initialization

//rewrite with var

console.log(greetings);
var greetings = "hello!";
//Output: undefined

//three levels of nested functions

function fun1() {
  var x = 1;
  function fun2() {
    var y = 2;
    function fun3() {
      var z = 3;
      console.log(x);
      console.log(y);
      console.log(z);
    }
    fun3();
  }
  fun2();
}

fun1();

//var-in-loop closure bug

for (var x = 0; x < 3; x++) {
  setTimeout(() => console.log(x), 100);
}
//Output: 3,3,3 (after 100ms)

for (let y = 0; y < 3; y++) {
  setTimeout(() => console.log(y), 100);
}

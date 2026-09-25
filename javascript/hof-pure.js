/*
Higher-Order Function (HOF) in JavaScript

A higher-order function is a function that accepts another function as an argument, returns a function, or both. Common examples are map, filter, reduce, and setTimeout.

Common examples -

const numbers = [1, 2, 3, 4];

numbers.map(n => n * 2);

numbers.filter(n => n > 2);

numbers.reduce((sum, n) => sum + n, 0);
*/

function calculate(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;

console.log(calculate(10, 5, add)); // 15

/*
Pure Function in JavaScript

A pure function always gives the same output for the same input and does not cause side effects.

Example of a pure function:
*/
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5

/*
Example of an impure function:
*/
let counter = 0;

function increment() {
  counter++;
  return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2

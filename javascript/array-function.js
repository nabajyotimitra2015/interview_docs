// array.slice - The slice() method slices out a piece of an array into a new array:
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(1);

// output - ["Orange", "Lemon", "Apple", "Mango"]

// array.splice - The splice() method can be used to add new items to an array:
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let removed = fruits.splice(2, 2, "Lemon", "Kiwi");

console.log(fruits); // ["Banana", "Orange", "Lemon", "Kiwi"]
console.log(removed); // ["Apple", "Mango"]

// The shift() method removes the first element of an array (and "shifts" the other elements to the left):
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift();

console.log(fruits); // ["Orange", "Apple", "Mango"]

// The unshift() method adds a new element to an array (at the beginning), and "unshifts" older elements:
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.unshift("Pineapple");

console.log(fruits); // ["Pineapple", "Banana", "Orange", "Apple", "Mango"]

/** -------------------------------------------------------------------------------------- **/

// ARRAY REDUCE WITH EXAMPLE
Array.prototype.reduce() is a JavaScript array method that iterates over an array and reduces it to a single value (number, object, array, string, etc.).

/*
Syntax
array.reduce((accumulator, currentValue, index, array) => {
  // return updated accumulator
}, initialValue);
accumulator: Stores the accumulated result.
currentValue: The current element being processed.
initialValue (optional but recommended): The starting value of the accumulator.
*/

// Example 1: Sum an array
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 10

/** -------------------------------------------------------------------------------------- **/

// Example 2: Multiply values
const numbers = [2, 3, 4];

const product = numbers.reduce((acc, curr) => acc * curr, 1);

console.log(product); // 24

/** -------------------------------------------------------------------------------------- **/

// Example 3: Flatten an array
const nested = [[1, 2], [3, 4], [5]];

const flat = nested.reduce((acc, curr) => acc.concat(curr), []);

console.log(flat);
// [1, 2, 3, 4, 5]

/** -------------------------------------------------------------------------------------- **/

// Example 4: Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana"];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(count);
// {
//   apple: 2,
//   banana: 2,
//   orange: 1
// }

/** -------------------------------------------------------------------------------------- **/

// Example 5: Group objects
const users = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 20 }
];

const grouped = users.reduce((acc, user) => {
  if (!acc[user.age]) {
    acc[user.age] = [];
  }
  acc[user.age].push(user);
  return acc;
}, {});

console.log(grouped);

Output:

{
  20: [
    { name: "Alice", age: 20 },
    { name: "Charlie", age: 20 }
  ],
  25: [
    { name: "Bob", age: 25 }
  ]
}

/** -------------------------------------------------------------------------------------- **/

// Find unique characters from two strings
function uniqueCharacters(str1, str2) {
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  const result = [];

  for (const char of set1) {
    if (!set2.has(char)) {
      result.push(char);
    }
  }

  for (const char of set2) {
    if (!set1.has(char)) {
      result.push(char);
    }
  }

  return result.join("");
}

console.log(uniqueCharacters("hello", "world"));

/** -------------------------------------------------------------------------------------- **/

// Find common characters from two strings
function findCommonCharacters(str1, str2) {
  const set2 = new Set(str2);
  const result = new Set();

  for (const char of str1) {
    if (set2.has(char)) {
      result.add(char);
    }
  }

  return [...result].join("");
}

console.log(findCommonCharacters("hello", "world"));
// "lo"

/** -------------------------------------------------------------------------------------- **/

// common characters with their frequency
function commonCharacters(str1, str2) {
  const freq = new Map();
  const result = [];

  for (const char of str2) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  for (const char of str1) {
    if (freq.get(char) > 0) {
      result.push(char);
      freq.set(char, freq.get(char) - 1);
    }
  }

  return result.join("");
}

console.log(commonCharacters("hello", "llama"));
// "ll"

/** -------------------------------------------------------------------------------------- **/

// Remove duplicate characters from a string

function removeDuplicates(str) {
  const seen = new Set();
  let result = "";

  for (const char of str) {
    if (!seen.has(char)) {
      seen.add(char);
      result += char;
    }
  }

  return result;
}

console.log(removeDuplicates("programming"));
// "progamin"

const removeDuplicates = str => [...new Set(str)].join("");
// "progamin"

/** -------------------------------------------------------------------------------------- **/

// Array SORTING bubble sort
function bubbleSort(arr) {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}

console.log(bubbleSort([5, 2, 8, 1, 3]));
// [1, 2, 3, 5, 8]

/** -------------------------------------------------------------------------------------- **/

// Merge SORT
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

console.log(mergeSort([5, 2, 8, 1, 3, 7, 6, 4]));

/** -------------------------------------------------------------------------------------- **/

// JavaScript Currying

// Currying is a technique where we transform a function 
// that takes multiple arguments into a sequence of functions, each taking one argument.

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(add(10)(20)(30));
// 60

/** -------------------------------------------------------------------------------------- **/

// Find duplicates in an array
const arr = [1, 2, 3, 2, 4, 5, 1, 3];

const seen = new Set();
const duplicates = new Set();

for (const item of arr) {
  if (seen.has(item)) {
    duplicates.add(item);
  } else {
    seen.add(item);
  }
}

console.log([...duplicates]);
// [2, 1, 3]

/** -------------------------------------------------------------------------------------- **/

// Find unique elements in an array
const arr = [1, 2, 3, 2, 4, 5, 1, 3];

const uniqueElements = arr.filter((item, index) => arr.indexOf(item) === index);

console.log(uniqueElements);
// [1, 2, 3, 4, 5]

/** -------------------------------------------------------------------------------------- **/

const data = [
  { id: 1, parentId: null, name: "Electronics" },
  { id: 2, parentId: 1, name: "Mobile" },
  { id: 3, parentId: 1, name: "Laptop" },
  { id: 4, parentId: 2, name: "iPhone" }
];

function buildTree(data) {
  const map = {};
  const tree = [];

  // Create lookup map
  data.forEach(item => {
    map[item.id] = {
      ...item,
      children: []
    };
  });

  // Build relationships
  data.forEach(item => {
    if (item.parentId === null) {
      tree.push(map[item.id]);
    } else {
      map[item.parentId].children.push(map[item.id]);
    }
  });

  return tree;
}

console.log(buildTree(data));

/** -------------------------------------------------------------------------------------- **/

function sortArray(array, key, order = "asc") {
  return [...array].sort((a, b) => {
    let result;

    if (typeof a[key] === "string") {
      result = a[key].localeCompare(b[key]);
    } else {
      result = a[key] - b[key];
    }

    return order === "desc" ? -result : result;
  });
}

const array = [
  { name: "xbc", points: 24 },
  { name: "abc", points: 21 },
  { name: "abc", points: 18 }
];

console.log(sortArray(array, "name", "asc"));
// abc, abc, xbc

console.log(sortArray(array, "points", "desc"));
// 24, 21, 18

/** -------------------------------------------------------------------------------------- **/
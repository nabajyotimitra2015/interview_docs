/*
What is spread operator in JavaScript?
The spread operator in JavaScript is represented by three dots (`...`) and is used to expand elements of an iterable (like an array or object) into individual elements. It allows for easy manipulation of arrays and objects, making it a powerful feature in modern JavaScript.
Key uses of the spread operator:
1. Array Expansion: The spread operator can be used to expand an array into individual elements, which is useful for creating new arrays or passing elements as arguments to functions.
   Example:
   ```javascript
   const arr = [1, 2, 3];
   const newArr = [...arr, 4, 5]; // newArr is [1, 2, 3, 4, 5]
   ```

2. Object Expansion: The spread operator can also be used to copy properties from one object to another, allowing for easy object merging and cloning.
   Example:
   ```javascript
   const obj1 = { a: 1, b: 2 };
   const obj2 = { ...obj1, c: 3 }; // obj2 is { a: 1, b: 2, c: 3 }
   ```

3. Function Arguments: The spread operator can be used to pass elements of an array as individual arguments to a function.
   Example:
   ```javascript
   function sum(x, y, z) {
     return x + y + z;
   }
   const numbers = [1, 2, 3];
   console.log(sum(...numbers)); // Output: 6
   ```

4. Copying Arrays and Objects: The spread operator can be used to create shallow copies of arrays and objects.
   Example:
   ```javascript
   const originalArray = [1, 2, 3];
   const copiedArray = [...originalArray]; // copiedArray is [1, 2, 3]

   const originalObject = { a: 1, b: 2 };
   const copiedObject = { ...originalObject }; // copiedObject is { a: 1, b: 2 }
   ```

In summary, the spread operator is a versatile feature in JavaScript that simplifies the manipulation of arrays and objects, making it easier to work with data structures and function arguments. It enhances code readability and reduces the need for more verbose methods of copying or merging data.
*/

/*
What is rest operator in JavaScript?
The rest operator in JavaScript is also represented by three dots (`...`) and is used to collect multiple elements into a single array or object. It allows for flexible function parameters and destructuring, making it a powerful feature in modern JavaScript.

Key uses of the rest operator:
1. Function Parameters: The rest operator can be used to gather all remaining arguments passed to a function into a single array.
   Example:
   ```javascript
    function sum(...numbers) {
      return numbers.reduce((acc, curr) => acc + curr, 0);
    }
    console.log(sum(1, 2, 3, 4)); // Output: 10
   ```

2. Destructuring Arrays: The rest operator can be used in array destructuring to collect the remaining elements into a new array.
   Example:
   ```javascript
   const [first, second, ...rest] = [1, 2, 3, 4, 5];
   console.log(first); // Output: 1
   console.log(second); // Output: 2
   console.log(rest); // Output: [3, 4, 5]
   ```

3. Destructuring Objects: The rest operator can also be used in object destructuring to collect the remaining properties into a new object.
   Example:
   ```javascript
   const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
   console.log(a); // Output: 1
   console.log(b); // Output: 2
   console.log(rest); // Output: { c: 3, d: 4 }
   ```

In summary, the rest operator is a versatile feature in JavaScript that simplifies the handling of function parameters and destructuring of arrays and objects. It enhances code readability and allows for more flexible data manipulation.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  return str === str.split("").reverse().join("");
}

console.log(isPalindrome("Mom")); // true
console.log(isPalindrome("Hello")); // false

// Without using reverse()

function isPalindrome(str) {
  str = str.toLowerCase();

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("Mom")); // true

function fibonacci(n) {
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    console.log(a);

    let next = a + b;
    a = b;
    b = next;
  }
}

fibonacci(10);

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return false;
    }
  }

  return true;
}

console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(isSorted([1, 3, 2, 4, 5])); // false

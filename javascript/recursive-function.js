function deepClone(obj) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Handle objects
  const cloned = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

// object equality
function deepEqual(obj1, obj2) {
  // Same reference or same primitive value
  if (obj1 === obj2) {
    return true;
  }

  // Handle null and non-object values
  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  // Handle arrays
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }

  // Compare number of keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Recursively compare each property
  for (const key of keys1) {
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      !deepEqual(obj1[key], obj2[key])
    ) {
      return false;
    }
  }

  return true;
}

// flatten an array
function flattenArray(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

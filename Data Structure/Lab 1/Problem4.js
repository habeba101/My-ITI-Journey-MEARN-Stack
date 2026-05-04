function countUniqueValues(sortedArray) {
  if (!sortedArray.length) return 0;
  let fc1 = {};
  let uniqueCounter = 0;
  for (let val of sortedArray) {
    fc1[val] = (fc1[val] || 0) + 1;
  }
  for (let k in fc1) {
    uniqueCounter++;
  }
  return uniqueCounter;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

function sumZero(sortedArray) {
  if (!sortedArray.length) return undefined;
  let left = 0;
  let right = sortedArray.length - 1;
  while (left < right) {
    if (sortedArray[left] + sortedArray[right] == 0)
      return [sortedArray[left], sortedArray[right]];
    //bigger zero and less than zero... edit conditions
    left++;
    right--;
  }
  return undefined;
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [-3,3]
console.log(sumZero([-2, 0, 1, 3])); // undefined
console.log(sumZero([1, 2, 3])); // undefined

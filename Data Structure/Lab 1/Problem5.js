function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;
  let maxSum = 0;
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += arr[i];
  }
  maxSum = sum;
  for (let j = num; j < arr.length; j++) {
    maxSum = maxSum + arr[j] - arr[j - num];
    sum = Math.max(sum, maxSum);
  }
  return sum;
}

console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubarraySum([4, 2, 1, 6], 1)); // 6
console.log(maxSubarraySum([4, 2, 1, 6, 2], 4)); // 13
console.log(maxSubarraySum([], 4)); // null

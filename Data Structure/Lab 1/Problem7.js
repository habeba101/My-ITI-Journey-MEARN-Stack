function findLongestSubstring(string) {
  if (!string.length) return 0;
  let longestLength = 0;
  let right = 0;
  let map = new Map();

  for (let left = 0; left < string.length; left++) {
    if (map.has(string[left]) && map.get(string[left]) >= right) {
      right = map.get(string[left]) + 1;
    }

    map.set(string[left], left);

    longestLength = Math.max(longestLength, left - right + 1);
  }
  return longestLength;
}

console.log(findLongestSubstring("")); // 0
console.log(findLongestSubstring("rithmschool")); // 7
console.log(findLongestSubstring("thisisawesome")); // 6
console.log(findLongestSubstring("thecatinthehat")); // 7
console.log(findLongestSubstring("bbbbbb")); // 1
console.log(findLongestSubstring("longestsubstring")); // 8
console.log(findLongestSubstring("thisishowwedoit")); // 6

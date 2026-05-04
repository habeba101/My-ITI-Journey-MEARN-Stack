function validAnagram(str1, str2) {
  let fc1 = {};
  let fc2 = {};
  if (str1.length != str2.length) return false;
  for (let val1 of str1) {
    fc1[val1] = (fc1[val1] || 0) + 1;
  }
  for (let val2 of str2) {
    fc2[val2] = (fc2[val2] || 0) + 1;
  }

  for (let k in fc1) {
    if (fc2[k] != fc1[k]) return false;
  }
  return true;
}

console.log(validAnagram("", "")); // true
console.log(validAnagram("aaz", "zza")); // false
console.log(validAnagram("anagram", "nagaram")); // true
console.log(validAnagram("rat", "car")); // false) // false
console.log(validAnagram("awesome", "awesom")); // false
console.log(validAnagram("qwerty", "qeywrt")); // true
console.log(validAnagram("texttwisttime", "timetwisttext")); // true

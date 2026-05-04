function same(arr1, arr2) {
  let fc1 = {};
  let fc2 = {};
  if (arr1.length != arr2.length) return false;
  for (let val1 of arr1) {
    fc1[val1] = (fc1[val1] || 0) + 1;
  }
  for (let val2 of arr2) {
    fc2[val2] = (fc2[val2] || 0) + 1;
  }
  for (let k in fc1) {
    if ((!(k ** 2)) in fc2) return false;
    if (fc2[k ** 2] != fc1[k]) return false;
  }
  return true;
}
console.log(same([1, 2, 3], [4, 1, 9])); //true
console.log(same([1, 2, 3], [1, 9])); //false
console.log(same([1, 2, 1], [4, 4, 1])); // false

function bubbleSort(array) {
  for (let i = array.length; i >= 0; i--) {
    let sorted = true;
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        sorted = false;
      }
    }
    if (sorted) break;
  }
  return array;
}
console.log("Bubble Sort");
console.log(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(bubbleSort([8, 12, 9, 8, 20, 6, 7, 15]));

function SelectionSort(array) {
  let min = 0;
  for (let i = 0; i < array.length - 1; i++) {
    min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    [array[i], array[min]] = [array[min], array[i]];
  }
  return array;
}

console.log("Selection Sort");
console.log(SelectionSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(SelectionSort([8, 12, 9, 8, 20, 6, 7, 15]));

function InsertionSort(array) {
  let j, key;
  for (let i = 1; i < array.length; i++) {
    key = array[i];
    j = i;
    while (j > 0 && array[j - 1] > key) {
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
      j--;
    }
    array[j] = key;
  }
  return array;
}
console.log("Insertion Sort");
console.log(InsertionSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(InsertionSort([8, 12, 9, 8, 20, 6, 7, 15]));
function merge(left, right) {
  let resultArray = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  while (rightIndex < right.length) resultArray.push(right[rightIndex++]);
  while (leftIndex < left.length) resultArray.push(left[leftIndex++]);
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}
function MergeSort(array) {
  if (array.length === 1) return array;
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(MergeSort(left), MergeSort(right));
}
console.log("Merge Sort");
console.log(MergeSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(MergeSort([8, 12, 9, 8, 20, 6, 7, 15]));

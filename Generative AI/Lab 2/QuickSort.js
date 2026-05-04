// Quick sort algorithm with in-place partitioning and tail recursion optimization
function quickSort(arr) {
  const result = arr.slice();
  quickSortInPlace(result, 0, result.length - 1);
  return result;
}

function quickSortInPlace(arr, left, right) {
  while (left < right) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex - left < right - pivotIndex) {
      quickSortInPlace(arr, left, pivotIndex - 1);
      left = pivotIndex + 1;
    } else {
      quickSortInPlace(arr, pivotIndex + 1, right);
      right = pivotIndex - 1;
    }
  }
}

function partition(arr, left, right) {
  const pivotIndex = left + Math.floor((right - left) / 2);
  const pivotValue = arr[pivotIndex];
  swap(arr, pivotIndex, right);

  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, storeIndex);
      storeIndex++;
    }
  }

  swap(arr, storeIndex, right);
  return storeIndex;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// example usage
let arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr));

// comparing.js

function quickSortRecursive(arr) {
  const result = arr.slice();
  quickSortInPlaceRecursive(result, 0, result.length - 1);
  return result;
}

function quickSortInPlaceRecursive(arr, left, right) {
  if (left >= right) return;

  const pivotIndex = partition(arr, left, right);
  quickSortInPlaceRecursive(arr, left, pivotIndex - 1);
  quickSortInPlaceRecursive(arr, pivotIndex + 1, right);
}

function quickSortIterative(arr) {
  const result = arr.slice();
  const stack = [{ left: 0, right: result.length - 1 }];

  while (stack.length > 0) {
    const { left, right } = stack.pop();
    if (left >= right) continue;

    const pivotIndex = partition(result, left, right);

    if (pivotIndex - 1 > left) {
      stack.push({ left, right: pivotIndex - 1 });
    }
    if (pivotIndex + 1 < right) {
      stack.push({ left: pivotIndex + 1, right });
    }
  }

  return result;
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

// Example usage
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log('Recursive:', quickSortRecursive(arr));
console.log('Iterative:', quickSortIterative(arr));

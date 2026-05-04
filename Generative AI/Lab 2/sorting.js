// sorting.js
// Contains implementations of Quick Sort, Merge Sort, and Heap Sort
// and a comparison of their behaviors.

// Quick Sort (in-place, average-case O(n log n))
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

// Merge Sort (stable, extra memory O(n))
function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  return merged.concat(left.slice(i), right.slice(j));
}

// Heap Sort (in-place, O(n log n), not stable)
function heapSort(arr) {
  const result = arr.slice();
  const n = result.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    swap(result, 0, end);
    heapify(result, end, 0);
  }

  return result;
}

function heapify(arr, heapSize, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== rootIndex) {
    swap(arr, rootIndex, largest);
    heapify(arr, heapSize, largest);
  }
}

// Comparison summary
// Quick Sort:
//   - Average: O(n log n)
//   - Worst: O(n^2)
//   - Space: O(log n) average stack, in-place
//   - Not stable
// Merge Sort:
//   - Average / Worst: O(n log n)
//   - Space: O(n) extra memory
//   - Stable
// Heap Sort:
//   - Average / Worst: O(n log n)
//   - Space: O(1) extra memory (in-place)
//   - Not stable
//
// When to choose each:
//   - Quick Sort: fast in practice for average datasets, good in-place performance
//   - Merge Sort: reliable worst-case behavior, stable, good for linked lists or large external sorts
//   - Heap Sort: predictable O(n log n) time and in-place, but usually slower than Quick Sort on average

// Example usage
const source = [3, 6, 8, 10, 1, 2, 1];
console.log('Quick Sort:', quickSort(source));
console.log('Merge Sort:', mergeSort(source));
console.log('Heap Sort:', heapSort(source));

# QuickSort Algorithm

A simple JavaScript implementation of the Quick Sort algorithm.

## Description

`QuickSort.js` sorts an array of numbers using a recursive divide-and-conquer approach:

- choose a pivot element
- partition the array into values less than the pivot and values greater than or equal to the pivot
- recursively sort each partition
- combine the sorted partitions and pivot into a final sorted array

## Code explanation

### `quickSort(arr)`

- Input: `arr` — an array of numbers
- Output: a new array sorted in ascending order

### How it works

1. **Base case**
   - If the array has `0` or `1` element, it is already sorted.
   - The function returns the array immediately.

2. **Pivot selection**
   - The first element of the array is chosen as the pivot:
     - `let pivot = arr[0];`

3. **Partitioning**
   - Two arrays are created:
     - `left` for values less than the pivot
     - `right` for values greater than or equal to the pivot
   - The loop starts from index `1` and pushes each element into `left` or `right`.

4. **Recursive sorting**
   - `quickSort(left)` sorts the left partition.
   - `quickSort(right)` sorts the right partition.

5. **Concatenation**
   - The final sorted result is:
     - `quickSort(left).concat(pivot, quickSort(right))`
   - This combines the sorted left partition, the pivot, and the sorted right partition.

## Key components

- `quickSort(arr)` — the main recursive sorting function
- `pivot` — the first item in the array, used to separate smaller and larger values
- `left` — array of items smaller than the pivot
- `right` — array of items greater than or equal to the pivot
- `concat(...)` — joins sorted partitions and pivot into the final array

## Example usage

```js
let arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr));
// Output: [1, 1, 2, 3, 6, 8, 10]
```

## Recursive vs Iterative Comparison

`comparing.js` contains both an in-place recursive Quick Sort and an iterative Quick Sort using an explicit stack.

### Recursive version

- Uses natural recursion to sort left and right partitions.
- Easier to read and understand.
- Uses the system call stack.
- Can overflow the stack on very large or degenerate arrays.

### Iterative version

- Uses an explicit `stack` array instead of recursion.
- Avoids deep call stacks and stack overflow.
- Slightly more code, but more robust for large inputs.
- Behaves the same in terms of sorting correctness.

### Comparison

- `quickSortRecursive`
  - clarity: high
  - stack usage: system recursion
  - risk: call stack overflow on large inputs
- `quickSortIterative`
  - clarity: medium
  - stack usage: explicit heap-allocated stack
  - risk: safer for large inputs

Both versions use the same `partition` and `swap` logic, so their average-case performance is the same: `O(n log n)`.

### Example usage

```js
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log('Recursive:', quickSortRecursive(arr));
console.log('Iterative:', quickSortIterative(arr));
```

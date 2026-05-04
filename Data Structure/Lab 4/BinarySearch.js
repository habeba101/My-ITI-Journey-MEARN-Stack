function BinarySearch(arr, key) {
  var start = 0;
  var end = arr.length;

  while (start <= end) {
    var middle = Math.floor((start + end) / 2);
    if (arr[middle] == key) return m;
    else if (key > arr[middle]) start = m + 1;
    else end = m - 1;
  }
  return -1;
}

function BinarySearchRecurssive(arr, key, start, end) {
  var start = 0;
  var end = arr.length;

  if (start > end) return -1;

  var middle = Math.floor((start + end) / 2);
  if (arr[middle] == key) return m;
  else if (key > arr[middle]) BinarySearchRecurssive(arr, key, m + 1, end);
  else BinarySearchRecurssive(arr, key, start, end - 1);
}

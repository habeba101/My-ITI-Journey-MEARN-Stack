// SECTION 1
var DuplictedArray = [3, 1, 2, 4, 3, 5, 1];
// Remove the duplicates
function removeDuplicates(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) delete arr[j];
    }
  }
  arr = arr.filter(function (elm) {
    return elm != undefined;
  });
  console.log(arr);
}
console.log("The Array without Duplicates");
removeDuplicates(DuplictedArray);

// Sorting  ascending
var arr = [3, 1, 2, 4, 3, 5, 1];
var result = arr.sort(function (a, b) {
  return a - b;
});
console.log("The Sorted Array is ");
console.log(result);

// User defined filter
var unFilteredArray = [10, 30, 50, 60, 90, 70, 110];
function FilterArray(array) {
  var filteredArray = new Array();
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 50) {
      filteredArray.push(array[i]);
    }
  }
  console.log(filteredArray);
}
console.log("The User Defined Filtered Array");
FilterArray(unFilteredArray);

//Built in Filter Function
var filteredArray = unFilteredArray.filter(function (elm) {
  return elm > 50;
});
console.log("The Built-in Filtered Array");
console.log(filteredArray);

// Display min and max numbers using user define function
// First Method
console.log("The First Method to get min and max");
var minMaxArray = [7, 9, 12, 2, 3, 6, 20, 5, 15];
function getMinMax(array) {
  array = array.sort(function (a, b) {
    return a - b;
  });
  console.log(array[0], array[array.length - 1]);
}
getMinMax(minMaxArray);

// Second Method
console.log("The First Method to get min and max");
function MaxNum(array) {
  var max = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }
  console.log(max);
}
MaxNum(minMaxArray);
function MinNum(array) {
  var min = array[0];
  for (var i = 0; i < array.length; i++) {
    if (min > array[i]) min = array[i];
  }
  console.log(min);
}
MinNum(minMaxArray);

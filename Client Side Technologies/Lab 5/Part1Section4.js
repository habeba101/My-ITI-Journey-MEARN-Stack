function removeDuplicates(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) delete arr[j];
    }
  }
  var filterarr = arr.filter(function (elm) {
    return elm != undefined;
  });
  return filterarr;
}

var arrayRandom = new Array();
for (let i = 0; i < 50; i++) {
  arrayRandom[i] = Math.ceil(Math.random() * 10);
  arrayRandom = removeDuplicates(arrayRandom);
  if (arrayRandom.length == 8) {
    break;
  }
}
console.log("The Random Array with no Duplicates");
console.log(arrayRandom);

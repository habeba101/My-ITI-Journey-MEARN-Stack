//SECTION 2
//First Part
var sumArray = [3, 1, 4, 5, 2];
function sumALL(numbersArray) {
  console.log(eval(numbersArray.join("+")));
}

console.log("Sum using Array as a Parameter");
sumALL(sumArray);

function productALL(numbersArray) {
  console.log(eval(numbersArray.join("*")));
}

console.log("Product using Array as a Parameter");
productALL(sumArray);

function sumALLArg() {
  var sum = 0;
  console.log(eval("for(i of arguments){sum+=i}"));
}
console.log("Sum using Argument Array-like as a Parameter");
sumALLArg(3, 1, 2, 4, 5);

function productALLArg() {
  var product = 1;
  console.log(eval("for (i of arguments) {product *= i;}"));
}

console.log("Product using Argument Array-like as a Parameter");
productALLArg(3, 1, 2, 4, 5);

//get the longest word
var userInput = prompt("Please enter a sentence");
// var stringArray = new Array();
userInput = userInput.trim();
userInput = userInput.split(" ");
console.log(userInput);
var max = 0;
var val = new String();
for (let i = 0; i < userInput.length; i++) {
  if (userInput[i].length > max) {
    max = userInput[i].length;
    val = userInput[i];
  }
}
console.log(val);

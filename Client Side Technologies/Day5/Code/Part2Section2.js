// Capitalization
var userInput = prompt("Please enter a sentence");
var stringArray = new Array();
userInput = userInput.trim();
userInput = userInput.toLowerCase(); //tolocalowercase
userInput = userInput.split(" ");

for (let i = 0; i < userInput.length; i++) {
  stringArray[i] = userInput[i][0].toUpperCase() + userInput[i].slice(1);
}
console.log(stringArray.join(" "));

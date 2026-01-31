//Mask Characters
var userInput = prompt("Please enter a sentence");
userInput = userInput.trim();
var notMasked = userInput.slice(-4);
var masked = "*".repeat(userInput.length - 4) + notMasked;
console.log(masked);

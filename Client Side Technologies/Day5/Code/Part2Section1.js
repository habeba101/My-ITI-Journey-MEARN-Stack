// Validation
var userInput = prompt("Please enter a sentence");
userInput = userInput.trim();
var flag = 0;
if (userInput.length == 0) {
  alert("you entered an empty string");
} else {
  for (let i = 0; i < userInput.length; i++) {
    if (
      !(
        (userInput.charCodeAt(i) >= 65 && userInput.charCodeAt(i) <= 90) ||
        (userInput.charCodeAt(i) >= 97 && userInput.charCodeAt(i) <= 122)
      )
    ) {
      flag = 1;
    }
  }
  if (flag) {
    console.log("Please enter a valid String");
  }
}

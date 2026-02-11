//Q3: Create a function that tracks how many times a button is clicked each Time Clicked To change Body Background

var button = document.getElementsByClassName("clicker")[0];
var colors = ["blue", "red", "green", "purple"];
button.addEventListener("click", colorCaller());

function colorCaller() {
  var counter = 0;
  function colorTracker() {
    document.body.style.background = colors[counter];
    counter = (counter + 1) % colors.length;
  }
  return colorTracker;
}

class Counter {
  counter: number = 0;
  increase() {
    return (this.counter += 1);
  }
  decrease() {
    return (this.counter -= 1);
  }

  reset() {
    return (this.counter = 0);
  }
}

let counterValue = new Counter();
let decreaseButton = document.getElementsByClassName("decrease")[0];
let resetButton = document.getElementsByClassName("reset")[0];
let increaseButton = document.getElementsByClassName("increase")[0];
let htmlVal = document.getElementsByTagName("h2")[0];

if (htmlVal) htmlVal.innerHTML = "0";
if (decreaseButton) {
  decreaseButton.addEventListener("click", function () {
    if (htmlVal) htmlVal.innerHTML = counterValue.decrease().toString();
  });
}
if (increaseButton) {
  increaseButton.addEventListener("click", function () {
    if (htmlVal) htmlVal.innerHTML = counterValue.increase().toString();
  });
}
if (resetButton) {
  resetButton.addEventListener("click", function () {
    if (htmlVal) htmlVal.innerHTML = counterValue.reset().toString();
  });
}

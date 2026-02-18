var Counter = /** @class */ (function () {
    function Counter() {
        this.counter = 0;
    }
    Counter.prototype.increase = function () {
        return (this.counter += 1);
    };
    Counter.prototype.decrease = function () {
        return (this.counter -= 1);
    };
    Counter.prototype.reset = function () {
        return (this.counter = 0);
    };
    return Counter;
}());
var counterValue = new Counter();
var decreaseButton = document.getElementsByClassName("decrease")[0];
var resetButton = document.getElementsByClassName("reset")[0];
var increaseButton = document.getElementsByClassName("increase")[0];
var htmlVal = document.getElementsByTagName("h2")[0];
if (htmlVal)
    htmlVal.innerHTML = "0";
if (decreaseButton) {
    decreaseButton.addEventListener("click", function () {
        if (htmlVal)
            htmlVal.innerHTML = counterValue.decrease().toString();
    });
}
if (increaseButton) {
    increaseButton.addEventListener("click", function () {
        if (htmlVal)
            htmlVal.innerHTML = counterValue.increase().toString();
    });
}
if (resetButton) {
    resetButton.addEventListener("click", function () {
        if (htmlVal)
            htmlVal.innerHTML = counterValue.reset().toString();
    });
}

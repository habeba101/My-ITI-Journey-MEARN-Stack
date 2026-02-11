import { Rectangle } from "./Rectangle.js";
import { Square } from "./Square.js";
import { Circle } from "./Circle.js";

let rect1 = new Rectangle("red", 10, 20);
let rect2 = new Rectangle("blue", 20, 30);
let rect3 = new Rectangle("green", 30, 40);
console.log(Rectangle.returnnumberofRectangles());

let sq1 = new Square("red", 10);
let sq2 = new Square("blue", 20);
let sq3 = new Square("green", 30);
console.log(Square.returnnumberofSquares());

let circle1 = new Circle("red", 10, 2, 2);
let circle2 = new Circle("blue", 20, 2, 2);
let circle3 = new Circle("green", 30, 2, 2);

let squareArray = [sq1, sq2, sq3];
let rectArray = [rect1, rect2, rect3];
let circleArray = [circle1, circle2, circle3];
console.log("------------------------------------");

for (let i = 0; i < squareArray.length; i++) {
  console.log(squareArray[i].toString());
}

console.log("------------------------------------");
for (let j = 0; j < rectArray.length; j++) {
  console.log(rectArray[j].toString());
}
// console.log(Rectangle.returnnumberofRectangles());
console.log("------------------------------------");
for (let j = 0; j < circleArray.length; j++) {
  console.log(circleArray[j].toString());
}

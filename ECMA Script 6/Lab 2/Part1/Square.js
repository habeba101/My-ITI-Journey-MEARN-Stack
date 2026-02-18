import { Rectangle } from "./Rectangle.js";

export class Square extends Rectangle {
  static numberofSquares = 0;

  constructor(_color, _width) {
    super(_color, _width, _width);
    Square.numberofSquares++;
  }

  calcArea() {
    return this.width * this.width;
  }
  calcPerimeter() {
    return this.width * 4;
  }

  static returnnumberofSquares() {
    return `Squares: ${Square.numberofSquares}`;
  }
}

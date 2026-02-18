import ShapeBase from "./ShapeBase.js";
export class Rectangle extends ShapeBase {
  #width;
  #height;
  static numberofRectangles = 0;
  constructor(_color, _width, _height) {
    super(_color);
    this.width = _width;
    this.height = _height;
    Rectangle.numberofRectangles++;
  }

  set width(val) {
    if (val <= 0 || val == undefined)
      throw new Error("Enter correct Value of width");
    else this.#width = val;
  }

  get width() {
    return this.#width;
  }

  set height(val) {
    if (val <= 0 || val == undefined)
      throw new Error("Enter correct Value of height");
    else this.#height = val;
  }

  get height() {
    return this.#height;
  }

  static returnnumberofRectangles() {
    return `Rectangles: ${Rectangle.numberofRectangles}`;
  }
  printColor() {
    return this.color;
  }
  calcArea() {
    return this.height * this.width;
  }
  calcPerimeter() {
    return (this.height + this.width) * 2;
  }
  toString() {
    return `Area value is ${this.calcArea()}, Perimeter value is ${this.calcPerimeter()}, the color is ${this.printColor()}`;
  }
}

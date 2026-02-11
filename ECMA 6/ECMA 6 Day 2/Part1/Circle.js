import ShapeBase from "./ShapeBase.js";

export class Circle extends ShapeBase {
  #radius;
  #x;
  #y;
  constructor(_color, _radius, _x, _y) {
    super(_color);
    this.radius = _radius;
    this.x = _x;
    this.y = _y;
  }
  set x(val) {
    if (val <= 0 || val == undefined)
      throw new Error("Enter correct Value of x");
    else this.#x = val;
  }
  set y(val) {
    if (val <= 0 || val == undefined)
      throw new Error("Enter correct Value of x");
    else this.#y = val;
  }
  set radius(val) {
    if (val <= 0 || val == undefined)
      throw new Error("Enter correct Value of x");
    else this.#radius = val;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get radius() {
    return this.#radius;
  }
  printColor() {
    return this.color;
  }
  calcArea() {
    return this.radius * this.radius * 3.14;
  }
  calcPerimeter() {
    return this.radius * 2 * 3.14;
  }
  toString() {
    return `Area value is ${this.calcArea()}, Perimeter value is ${this.calcPerimeter()}, the color is ${this.printColor()}`;
  }
}

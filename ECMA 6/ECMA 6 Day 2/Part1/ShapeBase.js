class ShapeBase {
  #color;
  constructor(_color) {
    if (this.constructor.name == "ShapeBase")
      throw new Error("can not take instance from ShapeBase");
    this.color = _color;
  }
  set color(val) {
    this.#color = val;
  }

  get color() {
    return this.#color;
  }

  printColor() {
    return "";
  }
  calcArea() {
    return 0;
  }
  calcPerimeter() {
    return 0;
  }
}

export default ShapeBase;

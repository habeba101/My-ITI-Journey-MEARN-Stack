function ShapeBase(_color) {
  if (this.constructor.name == ShapeBase)
    throw new Error(" You can't create a constructor from ShapeBase");
  this.color = _color;
}

ShapeBase.prototype.calcArea = function () {
  return 0;
};

ShapeBase.prototype.printColor = function () {
  return 0;
};
ShapeBase.prototype.calcPerimeter = function () {
  return 0;
};

function RectClass(_color, _width, _height) {
  ShapeBase.call(this, _color);
  this.width = _width;
  this.height = _height;
  RectClass.numberofRect++;
}

RectClass.prototype = Object.create(ShapeBase.prototype);
RectClass.prototype.constructor = RectClass;
RectClass.numberofRect = 0;
RectClass.returnRectCounts = function () {
  console.log("Rect Count: ", RectClass.numberofRect);
};

RectClass.prototype.printColor = function () {
  return this.color;
};
RectClass.prototype.calcArea = function () {
  return this.width * this.height;
};
RectClass.prototype.calcPerimeter = function () {
  return (this.height + this.width) * 2;
};
RectClass.prototype.toString = function () {
  return `Area is ${this.calcArea()}, Perimeter ${this.calcPerimeter()}, color: ${this.printColor()}`;
};

function SquareClass(_color, _width) {
  RectClass.call(this, _color, _width, _width);
  SquareClass.numberofSquares++;
}

SquareClass.prototype = Object.create(RectClass.prototype);
SquareClass.prototype.constructor = SquareClass;
SquareClass.numberofSquares = 0;
SquareClass.returnSquareCounts = function () {
  console.log("Square Count: ", SquareClass.numberofSquares);
};
SquareClass.prototype.calcPerimeter = function () {
  return this.width * 4;
};

var RectArea = [
  new RectClass("red", 5, 10),
  new RectClass("blue", 10, 20),
  new RectClass("green", 30, 15),
];

for (let i = 0; i < RectArea.length; i++) {
  console.log("Rectangle:" + RectArea[i]);
}
RectClass.returnRectCounts();
console.log("----------------------------------------------------------");

var squareArea = [
  new SquareClass("red", 5),
  new SquareClass("blue", 10),
  new SquareClass("green", 15),
];
for (let i = 0; i < squareArea.length; i++) {
  console.log("Square :" + squareArea[i]);
}
SquareClass.returnSquareCounts();

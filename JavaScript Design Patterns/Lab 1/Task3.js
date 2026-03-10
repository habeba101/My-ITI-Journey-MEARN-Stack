class ToyDuck {
  constructor(_color, _price) {
    this.color = _color;
    this.price = _price;
  }
  toyDetails() {
    console.log(
      `ToyDuck Color is ${this.color} and its price is ${this.price}`,
    );
  }
}

class ToyCar {
  constructor(_color, _price, _name) {
    this.color = _color;
    this.price = _price;
    this.name = _name;
  }
  toyDetails() {
    console.log(
      `ToyCar name is ${this.name}, its Color is ${this.color} and its price is ${this.price}`,
    );
  }
}

class ToyFactory {
  constructor(_toyType) {
    this.toyType = _toyType;
  }
  createToy(...data) {
    switch (this.toyType) {
      case "ToyDuck":
        return new ToyDuck(...data);
      case "ToyCar":
        return new ToyCar(...data);
    }
  }
}

let ToyFactory1 = new ToyFactory("ToyDuck");
let duck1 = ToyFactory1.createToy("red", 100);
let ToyFactory2 = new ToyFactory("ToyCar");
let car1 = ToyFactory2.createToy("blue", 200, "Motors");
duck1.toyDetails();
car1.toyDetails();

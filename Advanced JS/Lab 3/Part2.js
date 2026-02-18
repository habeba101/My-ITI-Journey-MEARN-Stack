function Car(_name, _speed) {
  if (this.constructor.name == Car)
    throw new Error(" You can't create a constructor from Car");
  this.name = _name;
  this.speed = _speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log("new speed: ", this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log("new speed: ", this.speed);
};

var car1 = new Car("BMW", 120);
var car2 = new Car("Mercedes", 95);
car1.accelerate();
car2.brake();

car1.brake();
car2.accelerate();

function ElectricCar(_name, _speed, _charge) {
  Car.call(this, _name, _speed);
  this.charge = _charge;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    this.name,
    " is going at ",
    this.speed,
    " km/h, with a charge of %",
    this.charge,
  );
};

var ec = new ElectricCar("Tesla", 120, 23);
ec.accelerate();
ec.chargeBattery(90);
console.log(ec.charge);
ec.accelerate();
ec.brake();

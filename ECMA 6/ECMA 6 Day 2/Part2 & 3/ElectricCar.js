import { Car } from "./Car.js";

export class ElectricCar extends Car {
  constructor(_name, _speed, _charge) {
    super(_name, _speed);
    this.charge = _charge;
  }
  chargeBattery(chargeto) {
    this.charge = chargeto;
    console.log(`The new battery charge is ${this.charge}`);
  }

  accelerate() {
    console.log(
      `${this.name} is going at ${(this.speed += 20)} km/h, with a charge of ${(this.charge -= 1)} %`,
    );
  }
}

var ec1 = new ElectricCar("Tesla", 120, 23);
ec1.accelerate();
ec1.brake();
ec1.chargeBattery(90);

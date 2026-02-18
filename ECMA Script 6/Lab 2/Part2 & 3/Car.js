export class Car {
  #serial;
  #name;
  #speed;
  static numberOfCars = 0;
  constructor(_name, _speed) {
    this.serial = 1;
    this.name = _name;
    this.speed = _speed;
    Car.numberOfCars++;
  }
  set serial(v) {
    this.#serial = v * Math.floor(Math.random() * 100);
  }
  get serial() {
    return this.#serial;
  }

  set name(val) {
    if ((val == "", val == undefined))
      throw new Error("Please enter a correct name");
    else this.#name = val;
  }
  get name() {
    return this.#name;
  }

  set speed(val) {
    if ((val <= 0, val == undefined))
      throw new Error("Please enter a correct number to generate the serial");
    else this.#speed = val;
  }
  get speed() {
    return this.#speed;
  }

  accelerate() {
    console.log(`The new speed after acceleration ${(this.speed += 10)}`);
  }

  brake() {
    console.log(`The new speed after brake ${(this.speed -= 5)}`);
  }
  returnSerialandNumberOfCars() {
    console.log(
      `The number of Cars are ${Car.numberOfCars}, the serial of the car is ${this.serial}`,
    );
  }
}

// let car1 = new Car("BMW", 120);
// let car2 = new Car("Mercedes", 95);
// car1.accelerate();
// car1.returnSerialandNumberOfCars();
// car2.accelerate();
// car2.returnSerialandNumberOfCars();

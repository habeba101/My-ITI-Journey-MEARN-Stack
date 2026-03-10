class BMW {
  drive() {
    console.log("driving BMW...");
  }
}

class VolksVagen {
  drive() {
    console.log("driving VolksVagen...");
  }
}

class Mercedes {
  drive() {
    console.log("driving Mercedes...");
  }
}

class Lamborgine {
  drive() {
    console.log("driving Lamborgine...");
  }
}

class Nissan {
  drive() {
    console.log("driving Nissan...");
  }
}

class Toyota {
  drive() {
    console.log("driving Toyota...");
  }
}

//Interface
class Car {
  constructor(type) {
    this.CarType = type;
  }
  CarUsed() {
    switch (this.CarType) {
      case "BMW":
        return new BMW();
      case "Mercedes":
        return new Mercedes();
      case "VolksVagen":
        return new VolksVagen();
      case "Toyota":
        return new Toyota();
      case "Nissan":
        return new Nissan();
      case "Lamborgine":
        return new Lamborgine();
    }
  }
}

let carsUsed = new Car("Lamborgine");
let carOne = carsUsed.CarUsed();
carOne.drive();

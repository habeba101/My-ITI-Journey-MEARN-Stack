class CEO {
  constructor(_name, _age, _address) {
    this.name = _name;
    this.age = _age;
    this.address = _address;
    if (CEO.instance) {
      return CEO.instance;
    }
    CEO.instance = this;
  }
}

let CEO1 = new CEO("Habeba", 26, "Mansoura");
let CEO2 = new CEO("Hanen", 27, "Giza");
console.log(CEO1 == CEO2);

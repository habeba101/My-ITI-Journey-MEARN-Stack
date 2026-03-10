class ConfigureVals {
  constructor(_xpoint, _ypoint, _shape) {
    this.xpoint = _xpoint || 0;
    this.ypoint = _ypoint || 0;
    this.shape = _shape || null;
    if (ConfigureVals.instance) {
      return ConfigureVals.instance;
    }
    ConfigureVals.instance = this;
  }
  showData() {
    console.log(
      `xpoint is ${this.xpoint}, ypoint is ${this.ypoint} shape is ${this.shape}`,
    );
  }
}

let val1 = new ConfigureVals(5, 10, "rectangle");
let val2 = new ConfigureVals(10, 10, "square");
console.log(val1 == val2);
val1.showData();
val2.showData();

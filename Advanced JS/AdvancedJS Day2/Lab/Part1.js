//Part1
// Create Person Object Contains the following Properties: ID:1, Name : ”Empty”
var PersonObject = {
  id: 0,
  name: "",
};

//Create Employee object which contains Salary property with set and get using defineProperty and set this value with bouns 20% and make it’s prototype Person Object:

// var EmployeeObject = Object.create(PersonObject, {
//   salary: {
//     set: function (val) {
//       salval = val + val * 0.2;
//     },
//     get: function () {
//       return salval;
//     },
//   },
// });

// use define properities to add salary to employee
var EmployeeObject = Object.create(PersonObject);
Object.defineProperties(EmployeeObject, {
  salary: {
    set: function (val) {
      salval = val + val * 0.2;
    },
    get: function () {
      return salval;
    },
  },
});

//Create HREmployee object which contains location Property and make it’s Prototype Employee object:
var HREmployee = Object.create(EmployeeObject, {
  location: {
    value: "",
  },
});
//Test prototype chain in console for HREmployee and Employee objects
console.log(EmployeeObject.__proto__);
console.log(EmployeeObject.__proto__.__proto__);
console.log(EmployeeObject.__proto__.__proto__.__proto__);

console.log(HREmployee.__proto__);
console.log(HREmployee.__proto__.__proto__);
console.log(HREmployee.__proto__.__proto__.__proto__);
console.log(HREmployee.__proto__.__proto__.__proto__.__proto__);

//Try to access person ID and Person Name using HREmployee object -
//in this case they return nothing
console.log(
  "id and name in person using HRemployee Object id: ",
  HREmployee.id,
  "name: ",
  HREmployee.name,
);

// Define Name And ID Properties with values For HREmployee Object then test if it accessible with person object
Object.defineProperty(HREmployee, "id", {
  value: 2,
  writeable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(HREmployee, "name", {
  value: "Habeba",
  writeable: true,
  configurable: true,
  enumerable: true,
});
// access them through hremployee

console.log("hremployee id: ", HREmployee.id, "name: ", HREmployee.name);
// access them through personObject
console.log(
  "Person  id: ",
  PersonObject.id,
  " Person name: ",
  PersonObject.name,
);

//Define Age Property with Person Object and test if it accessible with HREmployee Object
Object.defineProperty(PersonObject, "age", {
  value: 50,
  writeable: true,
  configurable: true,
  enumerable: true,
});

console.log("access age from hremployee", HREmployee.age);

//try create the previous objects again but using defineProperties to create each object proporty
var peronObj = {};
Object.defineProperties(peronObj, {
  id: { value: 0 },
  name: { value: "" },
  age: { value: 0 },
});
var employeeobj = Object.create(peronObj);
Object.defineProperties(employeeobj, {
  salary: {
    set: function (val) {
      salval = val + val * 0.2;
    },
    get: function () {
      return salval;
    },
  },
});
var hremployeeobj = Object.create(employeeobj);
Object.defineProperties(hremployeeobj, {
  location: {
    value: "",
  },
});

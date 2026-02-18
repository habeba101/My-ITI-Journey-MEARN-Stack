//Part2
//Employee Data:
var EmployeeData = [
  {
    id: 1,
    name: "Habeba",
    age: 26,
    salary: 10000,
    location: "Mansoura",
    department: "IT",
  },
  {
    id: 2,
    name: "Hanen",
    age: 23,
    salary: 4000,
    location: "Mansoura",
    department: "HR",
  },
  {
    id: 4,
    name: "Ahmed",
    age: 30,
    salary: 11000,
    location: "Mansoura",
    department: "IT",
  },
  {
    id: 3,
    name: "Omar",
    age: 20,
    salary: 5000,
    location: "Mansoura",
    department: "IT",
  },
];
// Q1: Create a function that returns another function that Take Emp and Return it’s Name
function nameFun() {
  EmployeesArray = new Array();
  function emp(empobj) {
    EmployeesArray.push(empobj);
    return empobj.name;
  }
  return emp;
}
//Q2: Create a counter function that increases every time it’s called.
function countFunction() {
  var counter = 0;
  function counterIncrease() {
    ++counter;
    return counter;
  }
  return counterIncrease;
}
//Q4: Create a closure that adds a fixed number to any number.
function addtoFixed() {
  var x = 10;
  function addval(y) {
    return x + y;
  }
  return addval;
}
//Q5: Create a closure that keeps track of how many employees have been added.
function empTracker(Array) {
  var empNum = Array.length;
  function empTrack() {
    return empNum;
  }
  return empTrack;
}
//Q6: Create a closure that Takea Bonus percentage and applies it To Emp Salary.
function calcBonus(Array) {
  var bonusval = 0.3;
  function bonus() {
    Array.forEach(function (elm) {
      elm.salary = elm.salary + elm.salary * bonusval;
    });
  }
  return bonus;
}
// Q7: Create a closure that remembers a department name and returns a Greeting.
function departmentGreeting(department) {
  var departGreeting = "Hello" + " " + department;
  function greeting() {
    console.log(departGreeting);
  }
  return greeting;
}
//Q8: Use map to get an array of employee names.
function EmpNames(Array) {
  var names = Array.map(function (elm) {
    return elm.name;
  });
  return names;
}
// Q9: Use filter to get only employees who earn more than 4500.
function SalaryFilter(Array) {
  var salaries = Array.filter(function (elm) {
    return elm.salary > 4500;
  });
  return salaries;
}
//Q10: Use reduce to calculate the total Salaries.
function calculateSalary(Array) {
  var total = 0;
  return Array.reduce(function (acc, elm) {
    return (acc += elm.salary);
  }, total);
}
//Q11: Create a pure function that increases an employee salary by 10%.
function PureCalcSalary(val) {
  return val + val * 0.1;
}
//Q12: Add a new employee to EmpArray immutably(without changing the original use map).
function immutableEmp(Array, empData) {
  var tempEmpArray = Array.map(function (elm) {
    return elm;
  });
  tempEmpArray.push(empData);
  Object.freeze(tempEmpArray);
  return tempEmpArray;
}
//Q13: Write a higher-order function applyBonus(fn).
function applyBonus(fun, val) {
  if (typeof fun == "function") {
    return fun(val);
  }
}
function higherOrderBonus(input) {
  return input.salary + input.salary * 0.3;
}
//Q14: Filter employees by department using a reusable curried function.
function filterDepartment(emp) {
  return function fildep(department) {
    return emp.filter(function (elm) {
      return elm.department == department;
    });
  };
}
// Q15: Use map to update salaries (+5%) without modifying the original.
function updateSalary(Array) {
  var newSalary = Array.map(function (elm) {
    return elm.salary + elm.salary * 0.05;
  });
  return newSalary;
}

//Adding Employee data
console.log("Employees adding to the Array and returning their names");
for (let i = 0; i < EmployeeData.length; i++) {
  var res = nameFun();
  console.log(res(EmployeeData[i]));
}
//Counter Increase
console.log("Counter Increase");
var counterRes = countFunction();
console.log(counterRes());
console.log(counterRes());
console.log(counterRes());
//adding fixed value (10) to any value
console.log("Adding fixed Value");
console.log(addtoFixed()(20));
console.log(addtoFixed()(220));

for (let i = 0; i < EmployeeData.length; i++) {
  var greet = departmentGreeting(EmployeeData[i].department);
  greet();
}
console.log("Employees Name");
console.log(EmpNames(EmployeeData));

console.log("Salary Filter");
console.log(SalaryFilter(EmployeeData));

console.log("Total Salary");
console.log(calculateSalary(EmployeeData));

console.log("How many Employees Now");
console.log(empTracker(EmployeeData)());

calcBonus(EmployeeData)();

// after applying bonus
for (let i = 0; i < EmployeeData.length; i++) {
  console.log(EmployeeData[i]);
}

console.log("Pure Calc Salaary");
for (let i = 0; i < EmployeeData.length; i++) {
  console.log(PureCalcSalary(EmployeeData[i].salary));
}

console.log("Apply bonus using high order Function");
for (let i = 0; i < EmployeeData.length; i++) {
  EmployeeData[i].salary = applyBonus(higherOrderBonus, EmployeeData[i]);
  console.log(EmployeeData[i]);
}

console.log("Updated Salary without affecting the original Value");
console.log(updateSalary(EmployeeData));
console.log(EmployeeData);

console.log("Filter using Curried Function");
var filteredDepartment = filterDepartment(EmployeeData)("IT");
console.log(filteredDepartment);

console.log("Immutable Temp Employee Array");
var newArray = immutableEmp(EmployeeData, {
  id: 10,
  name: "Esraa",
  age: 25,
  salary: 10000,
  location: "Mansoura",
  department: "Hr",
});
console.log(newArray);

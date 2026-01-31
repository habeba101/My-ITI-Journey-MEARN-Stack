function Students(_name, _age, _crs) {
  this.name = _name;
  this.age = _age;
  this.course = _crs;
}

var students = [
  new Students("Ali", 20, "CS"),
  new Students("Sara", 22, "Math"),
  new Students("Omar", 19, "Physics"),
  new Students("Laila", 21, "CS"),
  new Students("Hassan", 23, "Engineering"),
  new Students("Mona", 20, "Biology"),
  new Students("Kareem", 24, "Math"),
  new Students("Noor", 18, "CS"),
];

var tableRow = document.getElementsByTagName("table")[1];
var searchBar = document.getElementsByClassName("search");
var resultDiv = document.getElementsByClassName("result")[0];
var dropDownMenu = document.getElementsByName("sortVals")[0];
var p;
var tableData;
var result;
function displayFunction() {
  for (let i = 0; i < students.length; i++) {
    tableRow.appendChild(document.createElement("tr"));
    tableData = document.createElement("td");
    tableData.textContent = students[i].name;
    tableRow.children[i].appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = students[i].age;
    tableRow.children[i].appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = students[i].course;
    tableRow.children[i].appendChild(tableData);
  }
}
//Data Loading
document.addEventListener("DOMContentLoaded", displayFunction);
searchBar[0].addEventListener("keypress", function () {
  result = students.filter(function (elm) {
    return elm.name === searchBar[0].value || elm.course === searchBar[0].value;
  });
  result.forEach(function (elm) {
    p = document.createElement("p");
    p.innerText = elm.name + " " + elm.age + " " + elm.course;
    resultDiv.appendChild(p);
  });
});
dropDownMenu.addEventListener("change", function () {
  if (dropDownMenu.value === "age") {
    students.sort(function (a, b) {
      if (a.age > b.age) return 1;
      else if (a.age < b.age) return -1;
      else return 0;
    });
    tableRow.replaceChildren();
    displayFunction();
  } else if (dropDownMenu.value === "name") {
    students.sort(function (a, b) {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    });
    tableRow.replaceChildren();
    displayFunction();
  }
});

function Student(_fname, _lname, _crs, _phone, _email, _grade) {
  this.fname = _fname;
  this.lname = _lname;
  this.course = _crs;
  this.phone = _phone;
  this.email = _email;
  this.grade = _grade;
}

var students = [
  new Student(
    "Ahmed",
    "Ali",
    "JavaScript",
    "01011111111",
    "ahmed@mail.com",
    "A",
  ),
  new Student("Sara", "Hassan", "React", "01122222222", "sara@mail.com", "B+"),
  new Student(
    "Omar",
    "Mostafa",
    "Node.js",
    "01233333333",
    "omar@mail.com",
    "A-",
  ),
  new Student(
    "Laila",
    "Yousef",
    "Python",
    "01044444444",
    "laila@mail.com",
    "A",
  ),
  new Student(
    "Yassin",
    "Mahmoud",
    "MongoDB",
    "01155555555",
    "yassin@mail.com",
    "B",
  ),
];
var counter = 0;
var option;
var dropDownMenu = document.getElementById("student");
var inputArray = document.getElementsByName("data");
var deleteButton = document.getElementsByName("delete")[0];
var editButton = document.getElementsByName("edit")[0];
var selectedStudent;
students.forEach(function () {
  counter += 1;
});

for (let i = 0; i < students.length; i++) {
  option = document.createElement("option");
  option.value = "student" + i;
  option.textContent = students[i].fname + " " + students[i].lname;
  dropDownMenu.appendChild(option);
}

dropDownMenu.addEventListener("change", function () {
  students.forEach(function (elm) {
    document.getElementsByClassName("infoDiv")[0].style.visibility = "visible";
    selectedStudent =
      dropDownMenu.options[dropDownMenu.selectedIndex].textContent;
    if (selectedStudent === elm.fname + " " + elm.lname) {
      inputArray[0].value = elm.fname;
      inputArray[1].value = elm.lname;
      inputArray[2].value = elm.course;
      inputArray[3].value = elm.phone;
      inputArray[4].value = elm.email;
      inputArray[5].value = elm.grade;
    }
  });
});
editButton.addEventListener("click", function () {
  students.forEach(function (elm) {
    selectedStudent = dropDownMenu.options[dropDownMenu.selectedIndex];
    if (selectedStudent.textContent === elm.fname + " " + elm.lname) {
      elm.fname = inputArray[0].value;
      elm.lname = inputArray[1].value;
      elm.course = inputArray[2].value;
      elm.phone = inputArray[3].value;
      elm.email = inputArray[4].value;
      elm.grade = inputArray[5].value;
      selectedStudent.textContent =
        inputArray[0].value + " " + inputArray[1].value;
    }
  });
});
deleteButton.addEventListener("click", function () {
  students.forEach(function (elm) {
    selectedStudent = dropDownMenu.options[dropDownMenu.selectedIndex];
    if (selectedStudent.textContent === elm.fname + " " + elm.lname) {
      students = students.filter(function (elm) {
        return selectedStudent.textContent != elm.fname + " " + elm.lname;
      });
      dropDownMenu.removeChild(selectedStudent);
      inputArray[0].value = "";
      inputArray[1].value = "";
      inputArray[2].value = "";
      inputArray[3].value = "";
      inputArray[4].value = "";
      inputArray[5].value = "";
    }
  });
});

function Student(_name, _age, _crs) {
  //Student property
  this.name = _name;
  this.age = _age;
  this.course = _crs;
  // Display Student
  this.printStudents = function () {
    document.write(
      "Name : " + this.name + " Age : " + this.age + " Course : " + this.course,
    );
    document.write("<h1>****************************</h1>");
  };
}
var students = [
  new Student("Ali", 20, "CS"),
  new Student("Sara", 22, "Math"),
  new Student("Omar", 19, "Physics"),
  new Student("Laila", 21, "CS"),
  new Student("Hassan", 23, "Engineering"),
  new Student("Mona", 20, "Biology"),
  new Student("Kareem", 24, "Math"),
  new Student("Noor", 18, "CS"),
];

//1-Display All Students
document.write("Displaying the Whole students ");
document.write("<h1>-----------------------------------------</h1>");
students.forEach(function (elm) {
  elm.printStudents();
});

//2-Search by student name
var studentName = prompt("Please enter the student name");
studentName = studentName.trim();
studentName = studentName.toLowerCase();
studentName = studentName[0].toUpperCase() + studentName.slice(1);

var studentSearch = students.find(function (elm) {
  return elm.name == studentName;
});

if (studentSearch != undefined) {
  document.write("The student is ");
  studentSearch.printStudents();
} else {
  document.write("The student is not found");
  document.write("<h1>****************************</h1>");
}

//3-count the number of the students
var counter = 0;
for (i in students) {
  if (i) counter += 1;
}
document.write("The student count is ", counter);
document.write("<h1>****************************</h1>");

//4-filter Students who are in CS
document.write("The students who are in CS ");
document.write("<h1>-----------------------------------------</h1>");
var csStudents = students.filter(function (elm) {
  return elm.course == "CS";
});
csStudents.forEach(function (elm) {
  elm.printStudents();
});

//6-Sort the Students by age
students.sort(function (a, b) {
  if (a.age > b.age) return 1;
  else if (a.age < b.age) return -1;
  else return 0;
});

//5- The youngest student is
document.write("The youngest student is");
document.write("<h1>-----------------------------------------</h1>");
students[0].printStudents();

document.write("The student sorted list by age is ");
document.write("<h1>-----------------------------------------</h1>");
students.forEach(function (elm) {
  elm.printStudents();
});

//7-The student name array is
var studentNameArray = students.map(function (elm) {
  return elm.name;
});
document.write("The student names are ");
studentNameArray.forEach(function (elm) {
  document.writeln(elm, " ");
});

//8-check age if more than 18
document.write("<h1>-----------------------------------------</h1>");
document.write("The students who are above 18 ");
document.write("<h1>-----------------------------------------</h1>");
students.forEach(function (elm) {
  document.write(elm.age > 18);
  document.write("<h1>****************************</h1>");
});
//9- find if there are students in the same courses
var studensCounter = 0;
var studentCSnames = students.map(function (elm) {
  if (elm.course == "CS") {
    return elm.name;
  }
});
document.write("The student who are in the same course (CS) are<br/>");
studentCSnames.forEach(function (elm) {
  if (elm != undefined) document.writeln(elm);
  if (elm != undefined) studensCounter++;
});
document.writeln("<br/>The student's count is ", studensCounter);
document.writeln("<br/>");
studensCounter = 0;

var studentMathnames = students.map(function (elm) {
  if (elm.course == "Math") {
    return elm.name;
  }
});
document.write("The student who are in the same course (Math) are <br/>");
studentMathnames.forEach(function (elm) {
  if (elm != undefined) document.writeln(elm);
  if (elm != undefined) studensCounter++;
});
document.writeln("<br/>The student's count is ", studensCounter);
document.writeln("<br/>");
studensCounter = 0;

var studentEngineeringnames = students.map(function (elm) {
  if (elm.course == "Engineering") {
    return elm.name;
  }
});
document.write("The student who are in the same course (Engineering) are<br/>");
studentEngineeringnames.forEach(function (elm) {
  if (elm != undefined) document.writeln(elm);
  if (elm != undefined) studensCounter++;
});
document.writeln("<br/>The student's count is ", studensCounter);
document.writeln("<br/>");
studensCounter = 0;

var studentBiologynames = students.map(function (elm) {
  if (elm.course == "Biology") {
    return elm.name;
  }
});
document.write("The student who are in the same course (Biology) are<br/>");
studentBiologynames.forEach(function (elm) {
  if (elm != undefined) document.writeln(elm);
  if (elm != undefined) studensCounter++;
});
document.writeln("<br/>The student's count is ", studensCounter);
document.writeln("<br/>");
studensCounter = 0;

var studentPhysicsnames = students.map(function (elm) {
  if (elm.course == "Physics") {
    return elm.name;
  }
});
document.write("The student who are in the same course (Physics) are<br/>");
studentPhysicsnames.forEach(function (elm) {
  if (elm != undefined) document.writeln(elm);
  if (elm != undefined) studensCounter++;
});
document.writeln("<br/>The student's count is ", studensCounter);
document.writeln("<br/>");
studensCounter = 0;

document.write("<h1>****************************</h1>");
//10-average age Calculation
var ageSum = 0;
students.forEach(function (elm) {
  ageSum += elm.age;
});
var averageAge = ageSum / counter;
document.write("The Average age of students is ", averageAge);
document.write("<h1>****************************</h1>");

//Sort age descending
students.sort(function (a, b) {
  return b.age - a.age;
});

//11-the three top oldest student
document.write("the top 3 oldest student");
document.write("<h1>-----------------------------------------</h1>");
students.slice(0, 3).forEach(function (elm) {
  elm.printStudents();
});

//12-Find if there are students with the same name.
var flag = 0;
for (let i = 0; i < counter; i++) {
  for (let j = i + 1; j < counter; j++) {
    if (students[i].name == students[j].name) {
      flag = 1;
    }
  }
}
if (flag) document.write("There are students who has the same name");
else document.write("There are no students who has the same name");

document.write("<h1>-----------------------------------------</h1>");
document.write("The reversed Array is ");
document.write("<h1>-----------------------------------------</h1>");
//13-Reverse the array without using .reverse().
for (let i = counter - 1; i >= 0; i--) {
  students[i].printStudents();
}
//14-Add email with a format to the students
students.forEach(function (elm) {
  return (elm.email = elm.name.toLowerCase() + "@iti.com");
});
//display with email
students.forEach(function (elm) {
  document.write(
    "Name : " +
      elm.name +
      " Age : " +
      elm.age +
      " Course : " +
      elm.course +
      " Email :" +
      elm.email,
  );
  document.write("<h1>****************************</h1>");
});

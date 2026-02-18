var StudentsArray = [];
function addnewStudent(std) {
    //add new student to an array of students
    StudentsArray.push(std);
}
//calculate sum of grades
function calculateAverage(std) {
    var sum = 0;
    var average = 0;
    std.grades.forEach(function (elm) {
        sum += elm;
    });
    //calculate Average
    average = sum / std.grades.length;
    console.log("Average Grade ".concat(average));
    return average;
}
function StudentStatus(average) {
    //student Status
    if (average >= 90)
        return "Excellent";
    else if (average >= 70)
        return "Good";
    else if (average >= 50)
        return "Average";
    else if (average < 50)
        return "Needs improvments";
    else
        return "not valid average";
}
function printStudentData(std) {
    console.log("Student id :".concat(std.id));
    console.log("Student name :".concat(std.name));
    console.log("Student grades :".concat(std.grades));
    console.log("Student Active :".concat(std.isActive));
    if (std.email != undefined)
        console.log("Student email :".concat(std.email));
}
function printStudentsData(std) {
    std.forEach(function (elm) {
        console.log("Student name :".concat(elm.id));
        console.log("Student name :".concat(elm.name));
        console.log("Student name :".concat(elm.grades));
        console.log("Student name :".concat(elm.isActive));
        if (elm.email != undefined)
            console.log("Student name :".concat(elm.email));
        console.log("---------------------------------");
    });
}
var std1 = {
    id: 1,
    name: "Alice Johnson",
    isActive: true,
    grades: [55, 70, 90],
};
var std2 = {
    id: 2,
    name: "Bob Smith",
    isActive: true,
    grades: [90, 90, 100],
    email: "bobsmith@iti.com",
};
addnewStudent(std1);
printStudentData(std1);
var avgval = calculateAverage(std1);
console.log(StudentStatus(avgval));
console.log("---------------------------------");
addnewStudent(std2);
printStudentData(std2);
avgval = calculateAverage(std2);
console.log(StudentStatus(avgval));
console.log("---------------------------------");
console.log("Students Data");
console.log("---------------------------------");
printStudentsData(StudentsArray);

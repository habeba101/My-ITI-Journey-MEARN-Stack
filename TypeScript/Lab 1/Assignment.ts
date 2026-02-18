interface Student {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
  grades: Array<number>;
}

let StudentsArray: Student[] = [];

function addnewStudent(std: Student): void {
  //add new student to an array of students
  StudentsArray.push(std);
}
//calculate sum of grades

function calculateAverage(std: Student): number {
  let sum: number = 0;
  let average: number = 0;
  std.grades.forEach(function (elm) {
    sum += elm;
  });
  //calculate Average
  average = sum / std.grades.length;
  console.log(`Average Grade ${average}`);

  return average;
}
function StudentStatus(average: number): string {
  //student Status
  if (average >= 90) return "Excellent";
  else if (average >= 70) return "Good";
  else if (average >= 50) return "Average";
  else if (average < 50) return "Needs improvments";
  else return "not valid average";
}

function printStudentData(std: Student): void {
  console.log(`Student id :${std.id}`);
  console.log(`Student name :${std.name}`);
  console.log(`Student grades :${std.grades}`);
  console.log(`Student Active :${std.isActive}`);
  if (std.email != undefined) console.log(`Student email :${std.email}`);
}

function printStudentsData(std: Student[]): void {
  std.forEach(function (elm) {
    console.log(`Student name :${elm.id}`);
    console.log(`Student name :${elm.name}`);
    console.log(`Student name :${elm.grades}`);
    console.log(`Student name :${elm.isActive}`);
    if (elm.email != undefined) console.log(`Student name :${elm.email}`);
    console.log("---------------------------------");
  });
}

let std1: Student = {
  id: 1,
  name: "Alice Johnson",
  isActive: true,
  grades: [55, 70, 90],
};
let std2: Student = {
  id: 2,
  name: "Bob Smith",
  isActive: true,
  grades: [90, 90, 100],
  email: "bobsmith@iti.com",
};

addnewStudent(std1);
printStudentData(std1);
let avgval: number = calculateAverage(std1);
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

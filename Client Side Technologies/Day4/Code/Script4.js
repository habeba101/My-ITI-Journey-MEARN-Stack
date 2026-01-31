var studentGrade = parseFloat(prompt("enter the student grade"));
console.log("The student grade is ", studentGrade);

if (studentGrade >= 50 && studentGrade < 65) {
  console.log(studentGrade);
  console.log("%c" + "Fair", "color:#7FFFD4;font:bold 20px teko");
} else if (studentGrade > 65 && studentGrade < 75) {
  console.log(studentGrade);
  console.log("%c" + "good", "color:#088F8F;font:bold 20px teko");
} else if (studentGrade > 75 && studentGrade < 85) {
  console.log(studentGrade);
  console.log("%c" + " Very Good", "color:#5F9EA0;font:bold 20px teko");
} else if (studentGrade > 85 && studentGrade <= 100) {
  console.log(studentGrade);
  console.log("%c" + "Excellent", "color:#00FFFF;font:bold 20px teko");
} else {
  console.log("%c" + "Student Failed", "color:red ;font:bold 20px teko");
}

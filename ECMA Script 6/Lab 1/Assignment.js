let array = [60, 50, 40, 100, 20, 30, 70, 90];

array.sort((a, b) => {
  if (a > b) return 1;
  else if (b > a) return -1;
  else return 0;
});
console.log(array);

array.sort((a, b) => {
  if (b > a) return 1;
  else if (a > b) return -1;
  else return 0;
});
console.log(array);

let res = array.filter((elm) => {
  return elm > 50;
});
console.log(res);

console.log(Math.max(...array));
console.log(Math.min(...array));

function calculateVals(operator, ...vals) {
  let total = vals.join(operator);
  console.log(`result of sum operation for ${vals} is ${eval(total)}`);
}
calculateVals("+", 3, 1, 6, 3);

let projectID = 10;
let projectName = "ITI Shop";
let duration = 10;

const Project = {
  ["projectID"]: projectID,
  ["projectName"]: projectName,
  ["duration"]: duration,
  ["printData"]: () => {
    console.log(
      `Project Id is ${Project["projectID"]}, project Name is ${Project["projectName"]} project Duration is ${Project["duration"]}`,
    );
  },
};
Project["printData"]();

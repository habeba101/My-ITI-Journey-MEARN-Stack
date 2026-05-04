function fibonnaciRecurrsive(x) {
  if (x == 1) return 0;
  if (x == 2) return 1;
  return fibonnaciRecurrsive(x - 1) + fibonnaciRecurrsive(x - 2);
}

function fibonnaciIteration(x) {
  let x1 = 0;
  let x2 = 1;
  if (x == 1) return x1;
  if (x == 2) return x2;
  var result = 0;
  for (let i = 3; i <= x; i++) {
    result = x1 + x2;
    x1 = x2;
    x2 = result;
  }
  return result;
}
console.log(fibonnaciRecurrsive(11));
console.log(fibonnaciIteration(11));

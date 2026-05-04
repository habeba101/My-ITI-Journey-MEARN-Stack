class node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.topofStack = null;
    this.length = 0;
  }
  push(value) {
    var newNode = new node(value);
    if (!this.topofStack) this.topofStack = newNode;
    else {
      newNode.next = this.topofStack;
      this.topofStack = newNode;
    }
    this.length++;
    return this.topofStack;
  }

  pop() {
    if (!this.topofStack) return undefined;

    let value = this.topofStack.value;
    this.topofStack = this.topofStack.next;
    this.length--;
    return value;
  }

  peak() {
    if (!this.topofStack) return "Empty";
    let value = this.topofStack.value;
    return value;
  }
  display() {
    if (!this.topofStack) console.log("Empty");
    let pointer = this.topofStack;
    while (pointer) {
      console.log(pointer.value);
      pointer = pointer.next;
    }
  }
  isEmpty() {
    if (!this.topofStack) return true;
    else return false;
  }
}
function infixtoPostfix(e) {
  let stackOperator = new Stack();
  let operatorsArray = ["+", "-", "*", "/"];
  let precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  let postfix = "";

  for (let i = 0; i < e.length; i++) {
    if (e[i] === "(") {
      stackOperator.push(e[i]);
    } else if (e[i] === ")") {
      while (stackOperator.peak() !== "(") {
        postfix += stackOperator.pop();
      }
      stackOperator.pop();
    } else if (operatorsArray.includes(e[i])) {
      while (
        stackOperator.peak() !== "Empty" &&
        precedence[stackOperator.peak()] >= precedence[e[i]]
      ) {
        postfix += stackOperator.pop();
      }
      stackOperator.push(e[i]);
    } else if (!isNaN(e[i])) {
      postfix += e[i];
    }
  }
  while (stackOperator.peak() !== "Empty") {
    postfix += stackOperator.pop();
  }
  return postfix;
}

function calculation(postfix) {
  let operandStack = new Stack();
  for (let i = 0; i < postfix.length; i++) {
    if (!isNaN(postfix[i])) {
      operandStack.push(Number(postfix[i]));
    } else if (operandStack.length >= 2) {
      let v1 = Number(operandStack.pop());
      let v2 = Number(operandStack.pop());
      let result = 0;
      if (postfix[i] === "+") result = v2 + v1;
      else if (postfix[i] === "-") result = v2 - v1;
      else if (postfix[i] === "*") result = v2 * v1;
      else if (postfix[i] === "/") result = v2 / v1;
      operandStack.push(result);
    }
  }
  return operandStack.pop();
}

let e1 = "1+2*3/2";
let e2 = "1+2*(3+4)-5";
let p1 = infixtoPostfix(e1);
let p2 = infixtoPostfix(e2);
console.log(calculation(p1));
console.log(calculation(p2));
console.log(p1);
console.log(p2);

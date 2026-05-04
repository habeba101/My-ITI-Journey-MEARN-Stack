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

let s1 = new Stack();
s1.push(10);
s1.push(20);
s1.push(30);
s1.push(40);
s1.pop();
s1.pop();
s1.pop();
s1.pop();
s1.display();
console.log(s1.length);
console.log(s1.peak());
s1.push(10);
s1.push(20);
s1.push(30);
s1.push(40);
s1.display();
console.log(s1.length);

// console.log(s1.peak());

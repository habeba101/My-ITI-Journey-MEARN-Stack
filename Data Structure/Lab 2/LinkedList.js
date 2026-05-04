class Node {
  constructor(value) {
    this.node = value;
    this.next = null;
  }
}

class singleLinkedList {
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }
  push(value) {
    var newNode = new Node(value);
    if (!this.head) this.head = this.tail = newNode;
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  pop() {
    if (!this.head) return undefined;
    let temp = this.tail;

    if (this.head == this.tail) {
      this.head = this.tail = null;
    } else {
      let pointer = this.head;
      while (pointer.next != this.tail) {
        pointer = pointer.next;
      }
      this.tail = pointer;
      pointer.next = null;
    }
    this.length--;
    return temp;
  }
  shift() {
    if (!this.head) return undefined;
    let temp = this.head;
    this.head = this.head.next;
    this.length--;
    return temp.node;
  }
  unshift(value) {
    var node = new Node(value);
    if (!this.head) this.head = this.tail = node;
    else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this.head;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let i = 0;
    let pointer = this.head;
    while (i != index) {
      pointer = pointer.next;
      i++;
    }
    return pointer;
  }
  set(value, index) {
    let node = this.get(index);
    if (!node) return false;
    else {
      node.node = value;
      return true;
    }
  }
  insert(value, index) {
    if (index < 0 || index >= this.length) return false;
    else if (index == this.length) this.push(value);
    else if (index == 0) this.unshift(value);

    let prenode = this.get(index - 1);
    let node = new Node(value);
    node.next = prenode.next;
    prenode.next = node;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    else if (index == this.length - 1) this.pop();
    else if (index == 0) this.shift();

    let node = this.get(index - 1);
    let value = node.next.node;
    node.next = node.next.next;
    this.length--;
    return value;
  }
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next = node.next;
    let prev = null;
    while (node) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
  }
  display() {
    let pointer = this.head;
    while (pointer) {
      console.log(pointer.node);
      pointer = pointer.next;
    }
  }
}
function middleNode(list) {
  let slow = list.head;
  let fast = list.head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function hasLoop(list) {
  let slow = list.head;
  let fast = list.head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;
  }
  return false;
}

function kthNodeFromEnd(list, k) {
  if (!list) return null;
  if (k == 0) return null;
  let slow = list.head;
  let fast = list.head;
  let nthElement = k;

  while (nthElement) {
    nthElement--;
    fast = fast.next;
  }
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

let SLL = new singleLinkedList();
SLL.push(10);
SLL.push(20);
SLL.push(30);
SLL.push(40);
SLL.unshift(50);

SLL.set(100, 2);
SLL.insert(200, 2);
SLL.push(400);

console.log("removed value", SLL.remove(2));
console.log("Get value by Index", SLL.get(3));
SLL.reverse();

console.log(hasLoop(SLL));
console.log("middle Node", middleNode(SLL));
console.log("kth node from the end", kthNodeFromEnd(SLL, 2));

SLL.display();
console.log(SLL.length);

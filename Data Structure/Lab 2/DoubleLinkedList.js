class Node {
  constructor(value) {
    this.prev = null;
    this.node = value;
    this.next = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }
  push(value) {
    var newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
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
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return temp;
  }

  shift() {
    if (!this.head) return undefined;
    let temp = this.head;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
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
    if (index < 0 || index > this.length) return false;
    else if (index == this.length) this.push(value);
    else if (index == 0) this.unshift(value);

    let prenode = this.get(index - 1);
    let nextnode = prenode.next;
    let node = new Node(value);

    node.next = nextnode;
    prenode.next = node;
    node.prev = prenode;
    nextnode.prev = node;

    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    else if (index == this.length - 1) this.pop();
    else if (index == 0) this.shift();

    let prenode = this.get(index - 1);
    let nextnode = prenode.next.next;
    let value = prenode.next.node;
    prenode.next = prenode.next.next;
    nextnode.prev = prenode;
    this.length--;
    return value;
  }
  reverse() {
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    let node = this.tail;
    let pre;
    while (node) {
      pre = node.prev;
      node.prev = node.next;
      node.next = pre;
      node = node.prev;
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

let DLL = new DoubleLinkedList();
DLL.push(10);
DLL.push(20);
DLL.push(30);
DLL.push(40);
// DLL.pop();
// DLL.pop();
// DLL.shift();
// DLL.shift();
DLL.unshift(20);
DLL.unshift(100);
DLL.unshift(150);
DLL.set(100, 2);
DLL.insert(200, 2);
DLL.insert(300, 4);

// console.log("removed value", DLL.remove(2));
console.log("Get value by Index", DLL.get(3).node);
DLL.reverse();
DLL.display();
console.log(DLL.length);

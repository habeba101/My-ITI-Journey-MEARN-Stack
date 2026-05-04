class node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = this.rear = null;
    this.length = 0;
  }
  //new data in
  inQueue(value) {
    let newNode = new node(value);
    if (!this.rear) this.rear = this.front = newNode;
    else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.length++;
  }
  //data out
  deQueue() {
    if (!this.front) return "Empty";
    let value = this.front.value;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    this.length--;
    return value;
  }
  peak() {
    if (!this.front) return "Empty";
    else return this.front.value;
  }
  display() {
    if (!this.front) console.log("Empty");
    let pointer = this.front;
    while (pointer) {
      console.log(pointer.value);
      pointer = pointer.next;
    }
  }
  isEmpty() {
    if (!this.front) return true;
    else return false;
  }
}

let q1 = new Queue();
q1.inQueue(10);
q1.inQueue(20);
q1.inQueue(30);
q1.inQueue(40);
q1.display();
q1.deQueue();
q1.deQueue();
q1.deQueue();
q1.deQueue();
q1.display();

//Binary Search Tree...
// it can be a number, string , any type...
// pointer => left children
//pointer => right Children
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    var newNode = new Node(value);
    if (!this.root) this.root = newNode;
    else {
      var temp = this.root;
      while (temp) {
        if (value < temp.value) {
          if (temp.left == null) {
            temp.left = newNode;
            return;
          }
          temp = temp.left;
        } else {
          if (temp.right == null) {
            temp.right = newNode;
            return;
          }
          temp = temp.right;
        }
      }
    }
  }
  printInOrder() {
    //while loop or recurrsion...
    function printi(root) {
      if (root == null) return;
      printi(root.left);
      console.log(root.value);
      printi(root.right);
    }
    printi(this.root);
  }
  printPreOrder() {
    //while loop or recurrsion...
    function printp(root) {
      if (root == null) return;
      console.log(root.value);
      printp(root.left);
      printp(root.right);
    }
    printp(this.root);
  }
  printPostOrder() {
    //while loop or recurrsion...
    function printp(root) {
      if (root == null) return;

      printp(root.left);
      printp(root.right);
      console.log(root.value);
    }
    printp(this.root);
  }

  breadthFirstSearch() {
    let queue = [];
    let resultArray = [];
    if (!this.root) return null;
    else {
      queue.push(this.root);
      while (queue.length) {
        let current = queue.shift();
        resultArray.push(current.value);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return resultArray;
  }
}

var t1 = new BST();
t1.insert(50);
t1.insert(20);
t1.insert(30);
t1.insert(40);
t1.insert(60);
t1.insert(70);

console.log(t1.breadthFirstSearch());
console.log("Post");
t1.printPostOrder();
console.log("Pre");
t1.printPreOrder();
console.log("In");
t1.printInOrder();

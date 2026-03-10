// 1-Consider that we have A store that sell products
// and  every day the store put new products into
//  the store and the store want to let every people
//   that interested with store that new product is in the store now.

class Store {
  constructor(_name) {
    this.Storename = _name;
    this.productFollowers = [];
  }
  follow(productFollower) {
    this.productFollowers.push(productFollower);
  }
  unfollow(productFollower) {
    this.productFollowers = this.productFollowers.filter(
      (follower) => follower != productFollower,
    );
  }
  newProduct(productName) {
    this.productFollowers.forEach((follower) =>
      follower.alertMe(productName, this.Storename),
    );
  }
}

class productUser {
  constructor(_name) {
    this.name = _name;
  }
  alertMe(productName, storeName) {
    console.log(
      `Hello ${this.name}, ${storeName} has launced a new ${productName} `,
    );
  }
}

let store = new Store("Dior");
let follower1 = new productUser("Habeba");
let follower2 = new productUser("Hanen");
let follower3 = new productUser("Ahmed");
store.follow(follower1);
store.follow(follower2);
store.follow(follower3);

store.unfollow(follower3);
store.newProduct("blouse");

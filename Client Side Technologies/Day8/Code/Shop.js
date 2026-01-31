function Product(_id, _name, _title, _description, _price, _image) {
  this.id = _id;
  this.name = _name;
  this.title = _title;
  this.description = _description;
  this.price = _price;
  this.image = _image;
}
var products = [
  new Product(
    1,
    "Smartphone X",
    "Smartphone X Pro",
    "High-performance smartphone with OLED display.",
    799,
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  ),
  new Product(
    2,
    "Laptop Air",
    "Ultra Slim Laptop",
    "Lightweight laptop for work and gmaing.",
    1299,
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  ),
  new Product(
    3,
    "Bluetooth Headphones",
    "Wireless Noise Cancelling",
    "Immersive sound with deep bass.",
    199,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  ),
  new Product(
    4,
    "Smartwatch",
    "Fitness Smartwatch 2025",
    "Tracks health metrics all day.",
    149,
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  ),
  new Product(
    5,
    "Gmaing Keyboard",
    "RGB Mechanical Keyboard",
    "Blue switch mechanical keyboard.",
    89,
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
  ),
  new Product(
    6,
    "Smart Watch",
    "Ergonomic Pro Mouse",
    "Precision sensor and progrmamable buttons.",
    49,
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
  ),
  new Product(
    7,
    "4K Monitor",
    "Ultra HD 27-inch Monitor",
    "Sharp and vivid colors for work and gmaing.",
    399,
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  ),
  new Product(
    8,
    "DSLR Cmaera",
    "Professional DSLR Cmaera",
    "High-quality photography tool.",
    999,
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&q=80",
  ),
  new Product(
    9,
    "Wireless Speaker",
    "Portable Bluetooth Speaker",
    "Crystal clear sound on the go.",
    59,
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
  ),
  new Product(
    10,
    "KeyBoard Pro",
    "10-inch HD Tablet",
    "Perfect for study, movies, and work.",
    349,
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
  ),
  new Product(
    11,
    "Speaker",
    "Virtual Reality Set",
    "Immersive VR gmaing experience.",
    299,
    "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=500&q=80",
  ),
  new Product(
    12,
    "Drone",
    "4K Cmaera Drone",
    "Perfect aerial photography.",
    499,
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  ),
  new Product(
    13,
    "Wireless Charger",
    "Wireless Earbuds",
    "With active noise cancellation.",
    129,
    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&q=80",
  ),
  new Product(
    14,
    "SSD HardDesk",
    "Fast Charging 20000mAh",
    "Charge devices multiple times.",
    39,
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
  ),
  new Product(
    15,
    "Powe Bank",
    "50-inch 4K Smart TV",
    "Netflix, YouTube, and more built-in.",
    699,
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80",
  ),
];
var cartArray = new Array();
var favouriteArray = new Array();
var JsonData;
var itemDiv;
var itemImage;
var itemTitle;
var itemPrice;
var addToCart;
var heart;
var CartAdding;
var favouriteAdding;
var item;
var searchedProducts;
var productsDiv = document.getElementsByClassName("Products")[0];
var serachBar = document.getElementsByClassName("serachProducts")[0];
document.addEventListener("DOMContentLoaded", function () {
  //function is used to display products
  displayProducts(products);
  //Adding Item to Cart
  CartAdding = document.getElementsByClassName("buttons");
  for (var i = 0; i < products.length; i++) {
    CartAdding[i].addEventListener("click", function (e) {
      cartArray.push(
        products.filter(function (elm) {
          return (
            elm.title ==
            e.target.parentNode.getElementsByTagName("p")[0].innerHTML
          );
        }),
      );
      alert("Item added to cart");
      JsonData = JSON.stringify(cartArray);
      localStorage.setItem("cartArray", JsonData);
    });
  }
  //Adding Item to Favourite
  favouriteAdding = document.getElementsByClassName("heart");
  for (var i = 0; i < products.length; i++) {
    favouriteAdding[i].addEventListener("click", function (e) {
      favouriteArray.push(
        products.filter(function (elm) {
          return (
            elm.title ==
            e.target.parentNode.getElementsByTagName("p")[0].innerHTML
          );
        }),
      );
      alert("Item added to Favourite");
      JsonData = JSON.stringify(favouriteArray);
      localStorage.setItem("favouriteArray", JsonData);
    });
  }
  //Searching for a certain Product
  searchedProducts = document.getElementsByClassName("item");
  serachBar.addEventListener("input", function () {
    item = serachBar.value.toLowerCase();

    for (let i = 0; i < searchedProducts.length; i++) {
      if (
        searchedProducts[i].childNodes[1].innerHTML
          .toLowerCase()
          .indexOf(item) > -1
      ) {
        searchedProducts[i].style.display = "";
      } else {
        searchedProducts[i].style.display = "none";
      }
    }
  });
});
// display product Function
function displayProducts(dataArray) {
  dataArray.forEach(function (elm) {
    itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemImage = document.createElement("img");
    itemImage.src = elm.image;
    itemImage.classList.add("imgStyle");
    itemDiv.appendChild(itemImage);
    itemTitle = document.createElement("p");
    itemTitle.innerHTML = elm.title;
    itemDiv.appendChild(itemTitle);
    itemPrice = document.createElement("p");
    itemPrice.innerHTML = "$" + elm.price;
    itemDiv.appendChild(itemPrice);
    addToCart = document.createElement("div");
    addToCart.classList.add("buttons");
    addToCart.innerHTML = "Add to cart";
    itemDiv.appendChild(addToCart);
    heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    itemDiv.appendChild(heart);
    productsDiv.appendChild(itemDiv);
  });
}

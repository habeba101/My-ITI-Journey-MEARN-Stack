var subTotal;
var totalAmount = 0;
var remove;
var itemDiv;
var itemImage;
var itemTitle;
var itemPrice;
var plusButton;
var minusButton;
var subtractButton;
var amountP;
var addButton;
var removeButton;
var totalVal = document.getElementsByClassName("total")[0];
var cartDiv = document.getElementsByClassName("cartdiv")[0];
if (localStorage.getItem("cartArray") != ",") {
  var CartProducts = localStorage.getItem("cartArray");
  CartProducts = JSON.parse(CartProducts);
}
if (CartProducts[0][0] != undefined) {
  cartDiv.innerHTML = "";
}
document.addEventListener("DOMContentLoaded", function () {
  for (var i = 0; i < CartProducts.length; i++) {
    if (CartProducts[i][0] != undefined) {
      //showing Products
      itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemImage = document.createElement("img");
      itemImage.src = CartProducts[i][0].image;
      itemImage.classList.add("imgStyle");
      itemDiv.appendChild(itemImage);
      itemTitle = document.createElement("p");
      itemTitle.innerHTML = CartProducts[i][0].title;
      itemDiv.appendChild(itemTitle);
      itemPrice = document.createElement("p");
      itemPrice.innerHTML = "$ " + CartProducts[i][0].price + " x ";
      minusButton = document.createElement("input");
      minusButton.type = "button";
      minusButton.value = "-";
      minusButton.classList.add("minus");
      itemPrice.appendChild(minusButton);
      amountP = document.createElement("span");
      amountP.classList.add("val");
      amountP.innerHTML = 1;
      itemPrice.appendChild(amountP);
      plusButton = document.createElement("input");
      plusButton.type = "button";
      plusButton.value = "+";
      plusButton.classList.add("plus");
      itemPrice.appendChild(plusButton);
      itemDiv.appendChild(itemPrice);
      subTotal = document.createElement("p");
      subTotal.innerHTML = "subtotal: ";
      subTotal.innerHTML += CartProducts[i][0].price * 1;
      totalAmount += CartProducts[i][0].price;
      itemDiv.appendChild(subTotal);
      remove = document.createElement("div");
      remove.classList.add("buttons");
      remove.innerHTML = "remove";
      itemDiv.appendChild(remove);
      cartDiv.appendChild(itemDiv);
      totalVal.innerHTML = "Total $ " + totalAmount;
    } //showing Products function
  }
  //remove button function
  removeButton = document.getElementsByClassName("buttons");
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", function (e) {
      totalAmount -=
        CartProducts[i][0].price *
        parseInt(e.target.parentNode.childNodes[2].childNodes[2].innerHTML);
      totalVal.innerHTML = "Total $ " + totalAmount;
      e.target.parentNode.remove();
      CartProducts[i] = CartProducts[i].filter(function () {
        return (
          CartProducts[i][0].title !=
          e.target.parentNode.childNodes[1].innerHTML
        );
      });
      localStorage.setItem("cartArray", JSON.stringify(CartProducts));
    });
  } //remove button function end

  //add and plus buttons Functionality
  addButton = document.getElementsByClassName("plus");
  subtractButton = document.getElementsByClassName("minus");
  // add button Functionality
  for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", function (e) {
      e.target.parentNode.childNodes[2].innerHTML =
        parseInt(e.target.parentNode.childNodes[2].innerHTML) + 1;
      e.target.parentNode.parentNode.childNodes[3].innerHTML =
        "subtotal: " +
        (
          CartProducts[i][0].price *
          parseInt(e.target.parentNode.childNodes[2].innerHTML)
        ).toString();

      totalAmount += CartProducts[i][0].price;
      totalVal.innerHTML = "Total $ " + totalAmount;
    });
  }
  // minus button functionality
  for (let i = 0; i < subtractButton.length; i++) {
    subtractButton[i].addEventListener("click", function (e) {
      e.target.parentNode.childNodes[2].innerHTML =
        parseInt(e.target.parentNode.childNodes[2].innerHTML) - 1;
      totalAmount -= CartProducts[i][0].price;
      totalVal.innerHTML = "Total $ " + totalAmount;
      if (parseInt(e.target.parentNode.childNodes[2].innerHTML) === 0) {
        e.target.parentNode.parentNode.remove();
        CartProducts[i] = CartProducts[i].filter(function () {
          return (
            CartProducts[i][0].title !=
            e.target.parentNode.parentNode.childNodes[1].innerHTML
          );
        });
        localStorage.setItem("cartArray", JSON.stringify(CartProducts));
      } else {
        e.target.parentNode.parentNode.childNodes[3].innerHTML =
          "subtotal: " +
          (
            CartProducts[i][0].price *
            parseInt(e.target.parentNode.childNodes[2].innerHTML)
          ).toString();
      }
    });
  }
});
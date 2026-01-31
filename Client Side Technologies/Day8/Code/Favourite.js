var p;
var itemDiv;
var itemImage;
var itemTitle;
var itemPrice;
var remove;
var removeButton;
var favouriteDiv = document.getElementsByClassName("favourite")[0];
if (localStorage.getItem("favouriteArray") != ",") {
  var FavouriteProduct = localStorage.getItem("favouriteArray");
  FavouriteProduct = JSON.parse(FavouriteProduct);
}
if (FavouriteProduct[0][0] != undefined) {
  favouriteDiv.removeChild(favouriteDiv.children[0]);
}
document.addEventListener("DOMContentLoaded", function () {
  // displaying favourite Items
  for (var i = 0; i < FavouriteProduct.length; i++) {
    if (FavouriteProduct[i][0] != undefined) {
      itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemImage = document.createElement("img");
      itemImage.src = FavouriteProduct[i][0].image;
      itemImage.classList.add("imgStyle");
      itemDiv.appendChild(itemImage);
      itemTitle = document.createElement("p");
      itemTitle.innerHTML = FavouriteProduct[i][0].title;
      itemDiv.appendChild(itemTitle);
      itemPrice = document.createElement("p");
      itemPrice.innerHTML = "$" + FavouriteProduct[i][0].price;
      itemDiv.appendChild(itemPrice);
      remove = document.createElement("div");
      remove.classList.add("buttons");
      remove.innerHTML = "remove";
      itemDiv.appendChild(remove);
      favouriteDiv.appendChild(itemDiv);
    }
  }
  //remove button Functionality
  removeButton = document.getElementsByClassName("buttons");
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", function (e) {
      e.target.parentNode.remove();
      FavouriteProduct[i] = FavouriteProduct[i].filter(function () {
        return (
          FavouriteProduct[i][0].title !=
          e.target.parentNode.childNodes[1].innerHTML
        );
      });
      localStorage.setItem("favouriteArray", JSON.stringify(FavouriteProduct));
      if (removeButton.length == []) {
        p = document.createElement("p");
        p.innerHTML = "no favourite yet";
        favouriteDiv.appendChild(p);
      }
    });
  }
});

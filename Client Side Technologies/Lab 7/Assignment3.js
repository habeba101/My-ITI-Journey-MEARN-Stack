var avaialbleUL = document.getElementsByTagName("ul")[0];
var selectedUL = document.getElementsByTagName("ul")[1];
var moveButton = document.getElementById("move");
var backButton = document.getElementById("back");
var text = "";
var newLi;

avaialbleUL.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    text = e.target.textContent;
    e.target.style.background = "blue";
  }
});

selectedUL.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    text = e.target.textContent;
    e.target.style.background = "blue";
  }
});

moveButton.addEventListener("click", function () {
  newLi = document.createElement("li");
  newLi.classList.add("orginal");
  newLi.innerText = text;
  selectedUL.appendChild(newLi);
  for (var i = 0; i < avaialbleUL.children.length; i++) {
    if (avaialbleUL.children[i].textContent === newLi.textContent)
      avaialbleUL.removeChild(avaialbleUL.children[i]);
  }
});
backButton.addEventListener("click", function () {
  newLi = document.createElement("li");
  newLi.classList.add("orginal");
  newLi.innerText = text;
  avaialbleUL.appendChild(newLi);
  for (var i = 0; i < selectedUL.children.length; i++) {
    if (selectedUL.children[i].textContent === newLi.textContent)
      selectedUL.removeChild(selectedUL.children[i]);
  }
});

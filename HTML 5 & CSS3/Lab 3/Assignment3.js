let allBtn = document.querySelector(".all");
let PhonesBtn = document.querySelector(".Phones");
let laptopsBtn = document.querySelector(".laptops");
let accessBtn = document.querySelector(".Acces");
let datanames = document.querySelectorAll(".dataname");
let data = document.querySelectorAll(".data");
allBtn.addEventListener("click", function () {
  data.forEach((elm) => {
    elm.style.display = "block";
  });
});
PhonesBtn.addEventListener("click", function () {
  datanames.forEach((elm) => {
    if (elm.dataset.name == "phone") {
      elm.parentElement.style.display = "block";
    } else {
      elm.parentElement.style.display = "none";
    }
  });
});
laptopsBtn.addEventListener("click", function () {
  datanames.forEach((elm) => {
    if (elm.dataset.name == "laptop") {
      elm.parentElement.style.display = "block";
    } else {
      elm.parentElement.style.display = "none";
    }
  });
});
accessBtn.addEventListener("click", function () {
  datanames.forEach((elm) => {
    if (elm.dataset.name == "access") {
      elm.parentElement.style.display = "block";
    } else {
      elm.parentElement.style.display = "none";
    }
  });
});
let favourite = document.querySelectorAll(".fav");
favourite.forEach(function (elm) {
  elm.addEventListener("click", function () {
    elm.innerText = `❤️ ${++elm.dataset.favourite}`;
  });
});

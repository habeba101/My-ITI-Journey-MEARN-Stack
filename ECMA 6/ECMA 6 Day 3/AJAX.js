let xmlJsonCountry = new XMLHttpRequest();
let xmlJsonNeighbor = new XMLHttpRequest();
let button = document.getElementById("readData");
let CountryName = document.getElementById("SearchCountry");
let image = document.getElementsByClassName("country-img")[0];
let countryName = document.getElementsByClassName("counter-name")[0];
let countryRegion = document.getElementsByClassName("counter-region")[0];
let people = document.getElementsByClassName("country-row")[0];
let language = document.getElementsByClassName("country-row")[1];
let currency = document.getElementsByClassName("country-row")[2];
let showdiv = document.getElementsByClassName("countries")[0];
let neighborval;
let country = "";
let maindiv = document.getElementsByClassName("countries")[0];
let newImage = document.getElementsByClassName("country-img")[1],
  newName = document.getElementsByClassName("counter-name")[1],
  newRegion = document.getElementsByClassName("counter-region")[1],
  newPeople = document.getElementsByClassName("country-row")[3],
  newlanguage = document.getElementsByClassName("country-row")[4],
  newcurrency = document.getElementsByClassName("country-row")[5];
button.addEventListener("click", () => {
  country = CountryName.value;
  country = country.trim();

  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      image.src = data[0].flag;
      countryName.innerHTML = data[0].name;
      countryRegion.innerHTML = data[0].region;
      people.innerHTML = "🧑‍🤝‍🧑" + data[0].population;
      language.innerHTML = "🗣️" + data[0].languages[0].name;
      currency.innerHTML = "💰" + data[0].currencies[0].name;

      neighborval = data[0].borders[1];

      fetch(`https://restcountries.com/v2/alpha/${neighborval}`)
        .then((response) => response.json())
        .then((neighbor) => {
          newImage.src = neighbor.flag;
          newName.innerHTML = neighbor.name;
          newRegion.innerHTML = neighbor.region;
          newPeople.innerHTML = "🧑‍🤝‍🧑" + neighbor.population;
          newlanguage.innerHTML = "🗣️" + neighbor.languages[0].name;
          newcurrency.innerHTML = "💰" + neighbor.currencies[0].name;
          showdiv.style.opacity = "1";
        });
    });
});

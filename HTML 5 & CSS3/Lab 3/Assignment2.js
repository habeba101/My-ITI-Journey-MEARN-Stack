let input = document.querySelector(".city");
let btn = document.querySelector(".btn");
let cityDataDiv = document.querySelector(".cityData");

btn.addEventListener("click", function () {
  //input=>validation;
  let val = input.value;
  if (val == "") {
    cityDataDiv.textContent = "Please enter a city name";
  } else if (val.search(/[0-9]/) !== -1) {
    cityDataDiv.textContent = "Please enter the city name without Numbers";
  } else {
    cityToCoords(val);
  }
});

async function cityToCoords(cityName) {
  await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}
`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let lat = data.results[0].latitude;
      let long = data.results[0].longitude;
      let name = data.results[0].name;
      let country = data.results[0].country;

      getWeatherAPI(lat, long, name, country);
    })
    .catch(() => {
      cityDataDiv.innerHTML = "<p>Couldn't find City</p>";
    });
}

async function getWeatherAPI(lat, long, name, country) {
  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
  )
    .then((response) => response.json())
    .then((weatherData) => {
      console.log(weatherData);
      let temperature = weatherData.current_weather.temperature;
      let windspeed = weatherData.current_weather.windspeed;
      let time = weatherData.current_weather.time;

      cityDataDiv.innerHTML = "";
      cityDataDiv.innerHTML = `<p>City Name: ${name}</p>
  <p>Country: ${country}</p>
  <p>Temperature: ${temperature} C</p>
  <p>Wind Speed: ${windspeed} Km/Hr</p>
  <p>Time: ${time}</p>`;
    })
    .catch(() => {
      cityDataDiv.innerHTML = "<p>Couldn't find City</p>";
    });
}

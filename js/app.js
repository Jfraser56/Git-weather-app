import { UI } from "./ui.js";
import { Weather } from "./weather.js";

//Variables
const container = document.querySelector(".container");
const theButton = document.querySelector(".the-button");
const searchBar = document.getElementById("search-bar");
const location = document.querySelector(".location");
const description = document.querySelector(".weather");
const temperature = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const wind = document.querySelector(".wind");
const cloudCover = document.querySelector(".cloud-cover");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");

// Instantiate UI and Fetch classes
const ui = new UI();
const weather = new Weather();

//Main ---
document.addEventListener("DOMContentLoaded", (e) => {
  loadAllWeather("boston");
});

function loadAllWeather(city) {
  //Get all weather info sorted
  const weatherInfo = weather.fetchWeather(city, container, location); //Defaults to boston
  const descInfo = weather.getDescription(weatherInfo);
  const tempInfo = weather.calcTemp(weatherInfo);
  const mainInfo = weather.getMain(weatherInfo);
  const windInfo = weather.calcWind(weatherInfo);
  const cloudInfo = weather.cloudCover(weatherInfo);
  const humidInfo = weather.getHumidity(weatherInfo);
  const pressInfo = weather.getPressure(weatherInfo);
  //Paint UI
  ui.insertLocation(location, city); //Defaults to boston
  ui.insertDesc(description, descInfo);
  ui.insertTemp(temperature, tempInfo);
  ui.insertIcon(icon, mainInfo);
  ui.insertWind(wind, windInfo);
  ui.insertInfo(cloudCover, cloudInfo, "Cloud Cover", "%");
  ui.insertInfo(humidity, humidInfo, "Humidity", "%");
  ui.insertInfo(pressure, pressInfo, "Air Pressure", "hPa");
}

theButton.addEventListener("click", (e) => {
  ui.toggleSearch(container);

  if (e.target.id === "state2") {
    const inputCity = searchBar.value;
    searchBar.setAttribute("placeholder", inputCity);
    searchBar.value = "";
    loadAllWeather(inputCity);
  }

  if (e.target.id === "state0") {
    ui.buttonState1(theButton, container);
  } else {
    ui.buttonState0(theButton);
  }
});

searchBar.addEventListener("keyup", (e) => {
  if (searchBar.value !== "") {
    ui.buttonState2(theButton);
  } else {
    ui.buttonState1(theButton);
  }
});

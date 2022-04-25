function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {hours = `0${hours}`};
let minutes = date.getMinutes();
if (minutes < 10) {minutes = `0${minutes}`};
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
  return `Last updated on ${day} ${hours}:${minutes}`;
}

function showCityWeather(response){
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#show-city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-condition").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-wind").innerHTML = `Windspeed ${Math.round(response.data.wind.speed)} m/s`;
  iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  document.querySelector("#current-time").innerHTML = formatDate(response.data.dt * 1000);
  
}

function search(city) {
  let apiKey = "05a453d2c06a99051e321b8b98d3ef67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityWeather);
}

function searchCity() {
  let city = document.querySelector("#city-input").value;
  search(city);
}

function handleSubmit(event) {
  event.preventDefault();
  searchCity();
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", handleSubmit);


function logPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "05a453d2c06a99051e321b8b98d3ef67";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityWeather);
}

function handleCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logPosition);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", handleCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

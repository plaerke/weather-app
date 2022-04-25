function formatDate(currentDate){

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturuday"
];
let day = days[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[currentDate.getMonth()];

let date = currentDate.getDate();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`
}
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`
}
let year = currentDate.getYear();

  return `Last updated: ${day} ${hours}:${minutes}`
}

let currentDate = new Date();
let currentTimeDisplay = document.querySelector("#current-time");
currentTimeDisplay.innerHTML = formatDate(currentDate);

function showCityWeather(response){
  document.querySelector("#show-city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-condition").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-wind").innerHTML = `Windspeed ${Math.round(response.data.wind.speed)} m/s`;
  iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
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

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", handleCurrentLocation);

search("New York");
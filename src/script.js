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

function formatForecastDate(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay(); 
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
   forecast.forEach(function(forecastDay, index){
     if (index < 6) {
    forecastHTML = forecastHTML +
      `
      <div class="col-2 forecast-boxes">
        <div class="next-days">
          <h4>${formatForecastDate(forecastDay.dt)}</h4>
          <img
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt=""
            width="70"
          />
          <strong class="high-temp"> ${Math.round(forecastDay.temp.max)}°</strong>
          <span class="low-temp"> ${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
      `; };
      });
    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  let apiKey = "05a453d2c06a99051e321b8b98d3ef67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response){
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#show-city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-condition").innerHTML = `<strong>${response.data.weather[0].main}</strong>`;
  document.querySelector("#current-wind").innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} m/s`;
  iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  document.querySelector("#current-time").innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
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
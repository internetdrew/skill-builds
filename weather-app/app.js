'use strict';

const locationNameEl = document.getElementById('location-name');
const timeEl = document.getElementById('time');
const iconEl = document.getElementById('icon');
const temperatureEl = document.getElementById('temperature');
const temperatureUnitEl = document.getElementById('temperature-unit');
const tempDescriptionEl = document.getElementById('temperature-description');

const proxy = 'https://cors-anywhere.herokuapp.com/';

const getLocationForecast = async function (lat, long) {
  const api = `https://api.weather.gov/points/${lat},${long}`;

  const res = await fetch(api);
  if (!res.ok) console.log('Problem fetching forecast: 1');

  const data = await res.json();
  const { forecast } = data.properties;
  const { city, state } = data.properties.relativeLocation.properties;
  return { city, state, forecast };
};

const displayForecast = function (forecastObj) {
  console.log(forecastObj);
  locationNameEl.textContent = `${forecastObj.city}, ${forecastObj.state}`;

  timeEl.textContent = forecastObj.time;
  temperatureEl.textContent = forecastObj.temperature;
  temperatureUnitEl.textContent = forecastObj.temperatureUnit;
  tempDescriptionEl.textContent = forecastObj.shortForecast;
  const { shortForecast } = forecastObj;
  console.log(shortForecast);

  setIcon(shortForecast.toLowerCase(), iconEl, forecastObj.isDaytime);
};

const setIcon = function (shortForecast, canvasEl, isDaytime) {
  const skycons = new Skycons({ color: 'white' });

  if (
    shortForecast.includes('rain') ||
    shortForecast.includes('showers') ||
    shortForecast.includes('thunderstorms')
  ) {
    skycons.add(canvasEl, Skycons.RAIN);
  }

  if (shortForecast.includes('clear') && isDaytime) {
    skycons.add(canvasEl, Skycons.CLEAR_DAY);
  }

  if (shortForecast.includes('clear') && !isDaytime) {
    skycons.add(canvasEl, Skycons.CLEAR_NIGHT);
  }

  if (shortForecast.includes('snow')) {
    skycons.add(canvasEl, Skycons.SNOW);
  }

  if (shortForecast.includes('wind')) {
    skycons.add(canvasEl, Skycons.WIND);
  }

  if (shortForecast.includes('sleet')) {
    skycons.add(canvasEl, Skycons.SLEET);
  }

  if (shortForecast.includes('fog')) {
    skycons.add(canvasEl, Skycons.FOG);
  }
  if (shortForecast.includes('cloudy')) {
    skycons.add(canvasEl, Skycons.CLOUDY);
  }
  if (shortForecast.includes('partly cloudy') && isDaytime) {
    skycons.add(canvasEl, Skycons.PARTLY_CLOUDY_DAY);
  }
  if (shortForecast.includes('partly cloudy') && !isDaytime) {
    skycons.add(canvasEl, Skycons.PARTLY_CLOUDY_NIGHT);
  }

  skycons.play();
};

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude: lat, longitude: long } = position.coords;
      const { city, state, forecast } = await getLocationForecast(lat, long);

      const res = await fetch(forecast);
      if (!res.ok) console.log('Problem fetching forecast: 2');
      const data = await res.json();
      data.properties.periods.forEach(el =>
        console.log(el.shortForecast.toLowerCase())
      );

      const {
        name: time,
        temperature,
        temperatureUnit,
        detailedForecast,
        isDaytime,
        icon,
        shortForecast,
      } = data.properties.periods[0];

      const forecastData = {
        city,
        state,
        time,
        temperature,
        temperatureUnit,
        detailedForecast,
        isDaytime,
        icon,
        shortForecast,
      };

      displayForecast(forecastData);
    });
  }

  if (!navigator.geolocation) {
    locationNameEl.textContent = 'Please enable location';
  }
});

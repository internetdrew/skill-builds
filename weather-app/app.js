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

  const iconStrArr = forecastObj.icon.split('/');
  const icon = iconStrArr
    .find(el => el.includes('_'))
    .split(',')[0]
    .toUpperCase();
  console.log(icon);
  setIcons(icon, iconEl);
};

const setIcons = function (icon, canvasEl) {
  const skycons = new Skycons({ color: 'white' });
  switch (icon) {
    case 'RAIN_SHOWERS':
      skycons.add(canvasEl, Skycons.RAIN);
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

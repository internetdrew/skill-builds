'strict mode';

const locationNameEl = document.getElementById('location-name');

const proxy = 'https://cors-anywhere.herokuapp.com/';

const getLocationForecast = async function (lat, long) {
  const api = `https://api.weather.gov/points/${lat},${long}`;
  const res = await fetch(api);
  if (res.ok) console.log('success: 1');
  const data = await res.json();
  const { city, state } = data.properties.relativeLocation.properties;
  const { forecast } = data.properties;
  return { city, state, forecast };
};

const displayForecast = function (forecastObj) {};

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude: lat, longitude: long } = position.coords;
      const { city, state, forecast } = await getLocationForecast(lat, long);
      locationNameEl.textContent = `${city}, ${state}`;

      const res = await fetch(forecast);
      if (res.ok) console.log('success: 2');
      const data = await res.json();
      console.log(data.properties.periods[0]);

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
});

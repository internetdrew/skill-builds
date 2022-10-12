'strict mode';

const locationName = document.getElementById('location-name');

const proxy = 'https://cors-anywhere.herokuapp.com/';

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const api = `https://api.weather.gov/points/${latitude},${longitude}`;

      const res = await fetch(api);
      const data = await res.json();
      console.log(data);
      const { city, state } = data.properties.relativeLocation.properties;
      console.log(city, state);
      locationName.textContent = `${city}, ${state}`;

      const forecastRes = await fetch(data.properties.forecast);
      const forecastData = await forecastRes.json();
      console.log(forecastData);
    });
  }
});

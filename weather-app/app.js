'strict mode';

const API_KEY = config.API_KEY;

window.addEventListener('load', () => {
  // let longitude;
  // let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C${longitude}`;

      const res = await fetch(api);
      const data = await res.json();
      console.log(data);
    });
  }

  if (!navigator.geolocation) {
  }
});

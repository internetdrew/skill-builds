'strict mode';
const API_KEY = config.API_KEY;

const getLocationKey = async function (position) {
  const { latitude, longitude } = position.coords;

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C${longitude}`;

  const res = await fetch(api);
  const data = await res.json();
  return data.Key;
};

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const locationKey = await getLocationKey(position);
      console.log(locationKey);
    });
  }
});

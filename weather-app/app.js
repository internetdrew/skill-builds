'strict mode';

window.addEventListener('load', () => {
  // let longitude;
  // let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=G8E5BgT2YzZSURt2Q7U5d9StlEdMbdcQ&q=${latitude}%2C${longitude}`;

      const res = await fetch(api);
      console.log(res);
    });
  }

  if (!navigator.geolocation) {
  }
});

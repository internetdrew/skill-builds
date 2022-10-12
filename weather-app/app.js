'strict mode';

const API_KEY = config.API_KEY;


window.addEventListener('load', () => {
  // let longitude;
  // let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
<<<<<<< HEAD
      const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C${longitude}`;

      const res = await fetch(api);
      const data = await res.json();
      console.log(data);
=======
      const api = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=G8E5BgT2YzZSURt2Q7U5d9StlEdMbdcQ&q=${latitude}%2C${longitude}`;

      const res = await fetch(api);
      console.log(res);
>>>>>>> bd79784c85f1eb81c89637e050c44bdb2efb120a
    });
  }

  if (!navigator.geolocation) {
  }
});

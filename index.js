window.addEventListener('load',()=> {
    let long;
    let lat;
    let tempdegree = document.querySelector('.tempdegree');
    let tempdescription = document.querySelector('.tempdescription');
    let locationtimezone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (postion => {
          long = position.coords.longitude;
          lat = position.coords.latitude;
          
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = '${proxy}https://api.darksky.net/forecast/323cc627b42b9e049e3ac7597d8a70f5/${lat},${long}';
    fetch(api)
        .then(response => {
         return response.json();
        })
        .then(data => {
            const {temperature, summary} = data.currently;
            console.log(tempdegree);
            tempdegree.textContent = temperature;
            tempdescription.textContent = summary;
            locationtimezone.textContent = data.timezone;
        })
        })

    }
});
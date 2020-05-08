window.addEventListener('load',()=> {
    let long;
    let lat;
    let tempdegree = document.querySelector('.tempdegree');
    let tempdescription = document.querySelector('.tempdescription');
    let locationtimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (postion => {
          long = position.coords.longitude;
          lat = position.coords.latitude;
          function geoPosition(position){
              var lat = position.coords.latitude;
              var lng = position.coords.langnitude;
              alert("lat:" + lat + "lng:" + lng);
              catlatlng(lat, lng);
          }
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = `${proxy}https://api.darksky.net/forecast/323cc627b42b9e049e3ac7597d8a70f5/${lat},${long}`;
    fetch(api)
        .then(response => {
         return response.json();
        })
        .then(data => {
            const {temperature, summary ,icon} = data.currently;
            console.log(tempdegree);
            tempdegree.textContent = temperature;
            tempdescription.textContent = summary;
            locationtimezone.textContent = data.timezone;

            let celcius = (temperature -32) * (5 / 9);

            setIcons(icon, document.querySelector('.icon'));

            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === 'F'){
                    temperatureSpan.textContent = 'C';
                    temperaturedegree.textContent = Math.floor(celcius);
                } else{
                    temperatureSpan.textContent = 'F';
                    temperaturedegree.textContent =temperature;

                }
            })
        })
        })

    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"-").toUpperCase();
        skycons.play();
        return skycons.set(iconID,skycons[currentIcon]);
    }
});
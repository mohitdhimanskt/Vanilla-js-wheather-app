$(document).ready(function(){

    var id ="APPID=ba02317420a71b482c575129ae75f584",
    units = "imperial",
    city = " ",
    weatherIconCode = "",
    scale,
    rawTemp; 
    
    
    $("#textBox").focus();
    //$("#spinner").hide();
    
    //on enter, trigger click event
    $("#textBox").keyup(function(event){
        if(event.keyCode == 13){
            $("#getWeatherBtn").click();
        }
    });
    //main click event to get weather
    $('#getWeatherBtn').on('click', function(){
      city = $("input").val(); 
      if(!city) {
        return; 
      } else {
      $("#spinner").show();
      $.ajax(
      "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&" + id, {
        datatype: "jsonp", 
        error: function(){
          $("#modalBack").fadeIn(300); 
          $("#spinner").hide();
        },
        success: function(data) {
        $("#spinner").hide();
          if(scale == " F") {
            scale = " F";
            rawTemp = data.main.temp;
          } else {
            scale = " C";
            rawTemp = ((data.main.temp - 32) / 1.8);
          }
        var weather = data.weather[0].description;
        weather = (weather[0].toUpperCase() + weather.slice(1)); 
     
       $("#city").text(data.name); 
       $("#weather").text(weather);
       $("#temp").text(Math.round(rawTemp));
       $("#scale").text("\u00B0" + scale);
       setWeatherIcon(weather); 
       $("input").val(""); 
       $("#textBox").focus();
     },
        timeout: 7000
      }); 
      } //else
    });
    
 
    function setWeatherIcon(weath){
      $("i").removeClass(weatherIconCode);
      switch(weath) {
        case "Clear sky":
            weatherIconCode = "wi wi-day-sunny";
            break;
        case "Broken clouds":
        case "Few clouds":
        case "Scattered clouds":
            weatherIconCode = "wi wi-day-cloudy";
            break;
        case "Light rain":
            weatherIconCode = "wi wi-showers";
            break;
        case "Overcast clouds":
            weatherIconCode = "wi wi-cloudy";
            break;
        case "Mist":
        case "Fog":
            weatherIconCode = "wi wi-day-fog";
            break;
         case "Snow":
            weatherIconCode = "wi wi-snow";
            break;
        default:
            weatherIconCode = "wi wi-cloud"; 
    }
      $("i").addClass(weatherIconCode);
     return; 
    }
    
     
    $("#scaleBtn").on("click", function(){
      if(scale == " F"){
        rawTemp = ((rawTemp - 32) / 1.8)
         $("#temp").text(Math.round(rawTemp)); 
        scale = " C"; 
        $("#scale").text("\u00B0" + scale)
      } else if(scale == " C") {
        rawTemp = ((rawTemp * 1.8) + 32)
        $("#temp").text(Math.round(rawTemp));
        scale = " F";
        $("#scale").text("\u00B0" + scale);
      } else {
        $("#scale").text("-");
      }
      $("#textBox").focus();
    }); 
    
     
    $("#exitModal").on("click", function(){
      $("#modalBack").fadeOut(300);
      $("#textBox").val("");
      $("#textBox").focus(); 
    });
    
      
      
    }); 
      
    
    
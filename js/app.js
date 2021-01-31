
const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather_icon');
const tempElement = document.querySelector('.temperature_value p');
const descElement = document.querySelector('.temperature_descrip p');
const locationElement = document.querySelector('.location p');

//App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//Check if browser supports geolocation
function geolocation() {
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
        else {
            notificationElement.style.display = "block";
            notificationElement.innerHTML = "<p>Browser don´t support geolocation.</p>"
        }
}

//Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

//Show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//Get weather from api provider
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={key}`;

    console.log(api);

    fetch(api) .then( function(response){
                    let data = response.json();
                    return data;
                })
                .then(function(data){
                    weather.description = data.weather[0].icon;
                    weather.iconId = data.weather[0].icon;
                    weather.city = data.name;
                    weather.country = data.sys.country;
                })
}

//////////////////////////////

function displayWeather() {
    iconElement.innerHTML = 
        `<img src="icons/${weather.iconId}.png"/>`;
    
    tempElement.innerHTML = 
        `${weather.temperature.value} ° <span>C</span>`;

    descElement.innerHTML = 
        weather.description;

    locationElement.innerHTML = 
        `${weather.city}, ${weather.country}`;
}
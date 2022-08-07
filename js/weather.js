const API_KEY = "692f76c35ccf73de9fedd5ffede18897";

function onGeo(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(api)
    .then((response) => response.json())
    .then((data) => {
        const cityContainer = document.querySelector("#weather span:first-child");
        const weatherConatiner = document.querySelector("#weather span:last-child");
        cityContainer.innerText = data.name;
        weatherConatiner.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoError() {
    alert("Can't find you. No weahter for you.");
}

navigator.geolocation.getCurrentPosition(onGeo, onGeoError);
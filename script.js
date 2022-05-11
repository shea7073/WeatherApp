const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '6e347c6197msh31ecfc7db962be8p16719bjsn52626e3551e1'
    }
};

const degreeToDirection = function(degree) {
    let direction;
    if (degree >= 348.75 || degree <= 11.25) {
        direction = "N";
    } else if (degree > 11.25 && degree <= 33.75) {
        direction = "NNE";
    } else if (degree > 33.75 && degree <= 56.25) {
        direction = "NE";
    } else if (degree > 56.25 && degree <= 78.75) {
        direction = "ENE";
    } else if (degree > 78.75 && degree <= 101.25) {
        direction = "E";
    } else if (degree > 101.25 && degree <= 123.75) {
        direction = "ESE";
    } else if (degree > 123.75 && degree <= 146.25) {
        direction = "SE";
    } else if (degree > 146.25 && degree <= 168.75) {
        direction = "SSE";
    } else if (degree > 168.75 && degree <= 191.25) {
        direction = "S";
    } else if (degree > 191.25 && degree <= 213.75) {
        direction = "SSW";
    } else if (degree > 213.75 && degree <= 236.25) {
        direction = "SW";
    } else if (degree > 236.25 && degree <= 258.75) {
        direction = "WSW";
    } else if (degree > 258.75 && degree <= 281.25) {
        direction = "W";
    } else if (degree > 281.25 && degree <= 303.75) {
        direction = "WNW";
    } else if (degree > 303.75 && degree <= 326.25) {
        direction = "NW";
    } else {
        direction = "NNW";
    }
    return direction;
}

async function fetchWeather() {
    let response = await fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&lang=null&units=imperial', options);
    const data = await response.json();
    console.log(data);
    document.querySelector('.temp').textContent = data.main.temp + '°';
    document.querySelector('.temp').innerHTML += "<p class=\"temp-units\">F</p>";
    document.querySelector('.pressure').textContent = 'Pressure - ' + data.main.pressure;
    document.querySelector('.visibility').textContent = 'Visibility - ' + (data.visibility / 1000) + ' km';
    document.querySelector('.wind').textContent = 'Wind - ' + data.wind.speed + ' mph ' + degreeToDirection(data.wind.deg);
    const rise_stamp = data.sys.sunrise * 1000;
    const rise_converted = new Date(rise_stamp);
    const rise_stripped = rise_converted.getHours() + ':' + rise_converted.getMinutes();
    document.querySelector('.sunrise').textContent = 'Sunrise - ' + rise_stripped;
    const set_stamp = data.sys.sunset * 1000;
    const set_converted = new Date(set_stamp);
    const set_stripped = set_converted.getHours() + ':' + set_converted.getMinutes();
    document.querySelector('.sunset').textContent = 'Sunset - ' + set_stripped;
    document.querySelector('.high').textContent = 'H: ' + data.main.temp_max;
    document.querySelector('.low').textContent = 'L: ' + data.main.temp_min;
}

fetchWeather().catch(e => console.log(e));




//The Resurrection 

// DOM elements
const searchBox = document.querySelector('.city-input');
const searchButton = document.querySelector('.get-weather-btn');

// OpenWeatherMap API details
const apiKey = 'd1075876880a38ef7eb20912fcf98a55';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

/**
 * Checks if the input city name is valid
 * Invalid if it's empty or purely numeric
 */
function isValidCity(city) {
    return city.trim() !== '' && isNaN(city);
}

/**
 * Display the error message and hide weather card
 */
function showError() {
    document.querySelector('.error-msg').style.display = 'block';
    document.querySelector('.weather-card').style.display = 'none';
}

/**
 * Update the weather card UI with fetched weather data
 */
function updateWeatherUI(data) {
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity-value').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind-value').innerHTML = data.wind.speed + ' km/s';

    // Set weather icon based on condition
    let condition = data.weather[0].main;
    let iconMap = {
        Clouds: 'clouds.png',
        Clear: 'clear.png',
        Drizzle: 'drizzle.png',
        Mist: 'mist.png',
        Rain: 'rain.png',
        Snow: 'snow.png'
    };

    let iconFile = iconMap[condition] || 'clear.png'; // default fallback icon
    document.querySelector('.weather-icon').src = `assets/weather-app-img/images/${iconFile}`;

    document.querySelector('.error-msg').style.display = 'none';
    document.querySelector('.weather-card').style.display = 'block';
}

/**
 * Fetch weather for a given city and update the UI
 */
async function fetchWeather(city) {
    if (!isValidCity(city)) {
        showError();
        return;
    }

    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        const data = await response.json();

        // Handle invalid city names or errors
        if (!response.ok || data.cod === 404 || data.cod === 400) {
            showError();
            return;
        }

        // All good, show weather info
        updateWeatherUI(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError();
    }
}

// Handle button click
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim(); // trim extra spaces
    fetchWeather(city);
    searchBox.value = ''; // clear input
});

// Handle Enter key press
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchBox.value.trim();
        fetchWeather(city);
        searchBox.value = '';
    }
});



/*
const searchBox = document.querySelector('.city-input');
const searchButton = document.querySelector('.get-weather-btn');

const apiKey = 'd1075876880a38ef7eb20912fcf98a55';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
//experiment with form 


async function fetchWeather(city) {

    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (!response.ok || city === '') {
        // Handle non-successful HTTP responses (e.g., 404, 500)
        document.querySelector('.weather-app .error-msg').style.display = 'block';
        document.querySelector('.weather-card').style.display = 'none';
        console.error('Weather API returned an error:', response.status);
        return; // Stop execution if the response was not ok
    }
    
    const data = await response.json();

    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity-value').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind-value').innerHTML = data.wind.speed + ' km/s';

      if (data.cod === '404' || data.cod === '400'|| city === 'undefined') {
        document.querySelector('.weather-app .error-msg').style.display = 'block';
        document.querySelector('.weather-card').style.display = 'none';
      }
    else {

        if (data.weather[0].main === 'Clouds') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/clouds.png';
        }
        else if (data.weather[0].main === 'Clear') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/clear.png';
        }
        else if (data.weather[0].main === 'Drizzle') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/drizzle.png';
        }
        else if (data.weather[0].main === 'Mist') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/mist.png';
        }
        else if (data.weather[0].main === 'Rain') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/rain.png';
        }
        else if (data.weather[0].main === 'Snow') {
            document.querySelector('.weather-icon').src = 'assets/weather-app-img/images/snow.png';
        }
        

        document.querySelector('.error-msg').style.display = 'none';
        document.querySelector('.weather-card').style.display = 'block';
    }
}

searchButton.addEventListener('click', () => {

    fetchWeather(searchBox.value);
    searchBox.value = ''; // Clear the input box after fetching

}
)
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather(searchBox.value);
        searchBox.value = '';
    } // Clear the input box after fetching

}
)



console.log(typeof searchBox.value);
*/

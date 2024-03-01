const searchButton = document.querySelector('.search-box button');
const cityInput = document.querySelector('.search-box input');
const weatherIcon = document.querySelector('.weather-box img');
const temperatureElement = document.querySelector('.weather-box .temperature');
const descriptionElement = document.querySelector('.weather-box .description');
const humidityElement = document.querySelector('.humidity span');
const windElement = document.querySelector('.wind span');
const error404 = document.querySelector('.not-found');
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const cityName = document.querySelector('.city-name');

function searchWeather() {
    const apiKey = 'c26b7ec5d33762407c8dbd1db47aa80d';
    const city = cityInput.value;

    if (city === '') return;

      cityName.textContent = '';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            container.style.height = '555px'; 
            error404.classList.remove('active'); 

            const weatherIconCode = data.weather[0].icon;
            const weatherDescription = data.weather[0].description;
            const temperature = Math.round(data.main.temp); 
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            switch (data.weather[0].main) {
                case 'Clear':
                    weatherIcon.src = 'images/day.svg';      
                    break;
                case 'Rain':
                    weatherIcon.src = 'images/rainy-6.svg';      
                    break;
                case 'Snow':
                    weatherIcon.src = 'images/snowy-6.svg';      
                    break;
                case 'Clouds':
                    weatherIcon.src = 'images/cloudy-day-2.svg';      
                    break;
                case 'Mist':
                    weatherIcon.src = 'images/fog.png';      
                    break;
                case 'Haze':
                    weatherIcon.src = 'images/fog.png';      
                    break;
                default:
                    weatherIcon.src = 'images/cloudy-day-1.svg';
            }

            temperatureElement.textContent = `${temperature}°C`;
            descriptionElement.textContent = weatherDescription;
            humidityElement.textContent = `${humidity}%`;
            windElement.textContent = `${windSpeed} Km/h`;

            cityName.textContent = city.toUpperCase();

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            container.style.height = '404px'; 
            error404.classList.add('active'); 
            weatherBox.classList.remove('active'); 
            weatherDetails.classList.remove('active'); 
        });
}
searchButton.addEventListener('click', searchWeather);


cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

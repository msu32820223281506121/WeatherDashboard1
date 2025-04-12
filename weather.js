function getWeather() {
    const apiKey = '4443348dc04fb29623dd7da9dc9e2cb4';
    const city = document.getElementById('city').value;
    const loadingMessage = document.getElementById('loading');

    if (!city) {
        alert('Please enter a city');
        return;
    }

    loadingMessage.style.display = 'block';

    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=4443348dc04fb29623dd7da9dc9e2cb4&units=metric';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=4443348dc04fb29623dd7da9dc9e2cb4&units=metric';

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            loadingMessage.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
            loadingMessage.style.display = 'none';
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl =`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;

    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const nextHours = hourlyData.slice(0, 8);

    nextHours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

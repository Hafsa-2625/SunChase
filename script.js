$(document).ready(function () {
    const apiKey = 'e489edb8c445ae0274d06eb55d993e87';
    let currentUnit = 'metric';
    let charts = {};

    // New variables for pagination
    let forecastData = [];
    const entriesPerPage = 10;
    let currentPage = 1;


    $('#geolocation-button').on('click', function () {
        if (navigator.geolocation) {
            showLoadingSpinner();
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByLocation(lat, lon);
                    fetchForecastByLocation(lat, lon);
                },
                function (error) {
                    hideLoadingSpinner();
                    displayErrorMessage('Unable to retrieve your location. Please search for a city manually.');
                }
            );
        } else {
            displayErrorMessage('Geolocation is not supported by this browser.');
        }
    });

    // Loading spinner functions
    function showLoadingSpinner() {
        $('#loading-spinner').show();
    }

    function hideLoadingSpinner() {
        $('#loading-spinner').hide();
    }


    // Handle unit toggle switch (Celsius ↔ Fahrenheit)
    $('#unit-switch').on('change', function () {
        currentUnit = $(this).is(':checked') ? 'imperial' : 'metric';
        $('#unit-display').text(currentUnit === 'metric' ? '°C' : '°F');
        const city = $('#city-name').text().split(': ')[1];
        if (city) {
            fetchWeatherData(city);
            fetchForecastData(city);
        }
    });

    // Fetch current weather data by city name
    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                displayWeatherData(data);
            },
            error: function () {
                displayErrorMessage('City not found or API request failed');
            }
        });
    }

    // Fetch weather data by geolocation (lat, lon)
  

    // Fetch 5-day forecast data by geolocation (lat, lon)
    function fetchForecastByLocation(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                displayForecastData(data);
            },
            error: function () {
                displayErrorMessage('Forecast data not found for your location');
            }

        });
    }
    
    // Display current weather data

    function displayWeatherData(data) {
        const temperature = currentUnit === 'metric' ? `${data.main.temp}°C` : `${data.main.temp}°F`;
        $('#city-name').text(`City: ${data.name}`);
        $('#temperature').text(`Temperature: ${temperature}`);
        $('#humidity').text(`Humidity: ${data.main.humidity}%`);
        $('#wind-speed').text(`Wind Speed: ${data.wind.speed} ${currentUnit === 'metric' ? 'm/s' : 'mph'}`);
        $('#weather-description').text(`Description: ${data.weather[0].description}`);

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        $('#weather-icon').hide().attr('src', iconUrl).fadeIn(500);

        // Change the background based on the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clouds", "rain"
        updateWeatherBackground(weatherCondition);
    }

    // Helper function to update background based on weather condition
    function updateWeatherBackground(condition) {
        const widget = $('.main-content'); // Replace with the class/id of your weather widget

        widget.removeClass('clear clouds rain snow thunderstorm mist');

        switch (condition) {
            case 'clear':
                widget.addClass('clear');
                break;
            case 'clouds':
                widget.addClass('clouds');
                break;
            case 'rain':
            case 'drizzle':
                widget.addClass('rain');
                break;
            case 'snow':
                widget.addClass('snow');
                break;
            case 'thunderstorm':
                widget.addClass('thunderstorm');
                break;
            case 'mist':
            case 'haze':
            case 'fog':
                widget.addClass('mist');
                break;
            default:
                widget.addClass('default-weather');
                break;
        }
    }


    $('#geolocation-button').on('click', function () {
        if (navigator.geolocation) {
            showLoadingSpinner();
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByLocation(lat, lon);
                    fetchForecastByLocation(lat, lon);
                },
                function (error) {
                    hideLoadingSpinner();
                    displayErrorMessage('Unable to retrieve your location. Please search for a city manually.');
                }
            );
        } else {
            displayErrorMessage('Geolocation is not supported by this browser.');
        }
    });



    function displayForecastData(data) {
        forecastData = data.list; // Store all forecast data
        updateTable();
        updatePagination();

        const chartData = forecastData.filter((_, index) => index % 8 === 0).map(forecast => ({
            date: new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            temperature: forecast.main.temp,
            description: forecast.weather[0].main
        }));

        updateCharts(chartData);
    }

    function updateTable() {
        const tableBody = $('#forecast-body');
        tableBody.empty();

        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        const pageData = forecastData.slice(start, end);

        pageData.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const row = `
                <tr>
                    <td>${date.toLocaleDateString()}</td>
                    <td>${date.toLocaleTimeString()}</td>
                    <td>${entry.main.temp}°${currentUnit === 'metric' ? 'C' : 'F'}</td>
                    <td>${entry.weather[0].description}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Update or create charts based on new data
    function updateCharts(forecastData) {
        console.log('updateCharts called with data:', forecastData);
    
        if (!forecastData || forecastData.length === 0) {
            console.error('No forecast data available');
            return;
        }
    
        try {
            console.log('Updating temperature bar chart');
            updateTemperatureBarChart(forecastData);
        } catch (error) {
            console.error('Error updating temperature bar chart:', error);
        }
    
        try {
            console.log('Updating weather doughnut chart');
            updateWeatherDoughnutChart(forecastData);
        } catch (error) {
            console.error('Error updating weather doughnut chart:', error);
        }
    
        try {
            console.log('Updating temperature line chart');
            updateTemperatureLineChart(forecastData);
        } catch (error) {
            console.error('Error updating temperature line chart:', error);
        }
    }

    function updateTemperatureBarChart(forecastData) {
        const ctx = document.getElementById('temperatureBarChart').getContext('2d');
        const labels = forecastData.map(data => data.date); // Day labels
        const temperatures = forecastData.map(data => data.temperature); // Temp data
    
        if (charts.temperatureBar) {
            charts.temperatureBar.data.labels = labels;
            charts.temperatureBar.data.datasets[0].data = temperatures;
            charts.temperatureBar.update();
        } else {
            charts.temperatureBar = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Temperature (${currentUnit === 'metric' ? '°C' : '°F'})`,
                        data: temperatures,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: `Temperature (${currentUnit === 'metric' ? '°C' : '°F'})`
                            },
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '5-Day Temperature Forecast'
                        }
                    }
                }
            });
        }
    }

    function updateWeatherDoughnutChart(forecastData) {
        const ctx = document.getElementById('weatherDoughnutChart').getContext('2d');
        const weatherConditions = {};
        
        forecastData.forEach(data => {
            weatherConditions[data.description] = (weatherConditions[data.description] || 0) + 1;
        });
    
        if (charts.weatherDoughnut) {
            charts.weatherDoughnut.data.labels = Object.keys(weatherConditions);
            charts.weatherDoughnut.data.datasets[0].data = Object.values(weatherConditions);
            charts.weatherDoughnut.update();
        } else {
            charts.weatherDoughnut = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(weatherConditions),
                    datasets: [{
                        data: Object.values(weatherConditions),
                        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        onComplete: function() {},
                        delay: function(context) {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && context.dataIndex !== null) {
                                delay = context.dataIndex * 300;  // Delay each slice by 300ms
                            }
                            return delay;
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Weather Conditions Distribution'
                        }
                    }
                }
            });
        }
    }

    function updateTemperatureLineChart(forecastData) {
        const ctx = document.getElementById('temperatureLineChart').getContext('2d');
        const labels = forecastData.map(data => data.date);
        const temperatures = forecastData.map(data => data.temperature);
    
        if (charts.temperatureLine) {
            charts.temperatureLine.data.labels = labels;
            charts.temperatureLine.data.datasets[0].data = temperatures;
            charts.temperatureLine.update();
        } else {
            charts.temperatureLine = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Temperature (${currentUnit === 'metric' ? '°C' : '°F'})`,
                        data: temperatures,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: `Temperature (${currentUnit === 'metric' ? '°C' : '°F'})`
                            },
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Temperature Trend'
                        }
                    },
                    animation: {
                        onComplete: function() {},
                        easing: 'easeInBounce',
                        duration: 1500,
                        y: {
                            from: -500, // Animate the points dropping in from above the canvas
                        }
                    }
                }
            });
        }
    }
    
    // Display error message
    function displayErrorMessage(message) {
        $('#error-message').text(message).show();
        hideLoadingSpinner();
    }

    function clearErrorMessage() {
        $('#error-message').hide();
    }

    // Handle search button click
    $('.search-button').on('click', function () {
        const city = $('.search-bar').val().trim();
        if (city !== '') {
            clearErrorMessage();
            showLoadingSpinner();
            fetchWeatherData(city);
            fetchForecastData(city);
        } else {
            displayErrorMessage('Please enter a city name');
        }
    });

    // Fetch weather and forecast data by geolocation (lat, lon)
    function fetchWeatherByLocation(lat, lon) {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
        
        $.when(
            $.ajax({url: weatherApiUrl, method: 'GET'}),
            $.ajax({url: forecastApiUrl, method: 'GET'})
        ).done(function(weatherResponse, forecastResponse) {
            displayWeatherData(weatherResponse[0]);
            displayForecastData(forecastResponse[0]);
            hideLoadingSpinner();
        }).fail(function() {
            displayErrorMessage('Weather data not found for your location');
            hideLoadingSpinner();
        });
    }


    function fetchForecastByLocation(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                displayForecastData(data);
                hideLoadingSpinner();
            },
            error: function () {
                displayErrorMessage('Forecast data not found for your location');
            }
        });
    }

    function updateTable() {
        const tableBody = $('#forecast-body');
        tableBody.empty();
    
        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        const pageData = forecastData.slice(start, end);
    
        pageData.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const row = `
                <tr>
                    <td>${date.toLocaleDateString()}</td>
                    <td>${date.toLocaleTimeString()}</td>
                    <td>${entry.main.temp}°${currentUnit === 'metric' ? 'C' : 'F'}</td>
                    <td>${entry.weather[0].description}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }
    

    function updatePagination() {
        const totalPages = Math.ceil(forecastData.length / entriesPerPage);
        $('#page-info').text(`Page ${currentPage} of ${totalPages}`);
        $('#prev-page').prop('disabled', currentPage === 1);
        $('#next-page').prop('disabled', currentPage === totalPages);
    }

    $('#prev-page').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
            updatePagination();
        }
    });

    $('#next-page').on('click', function() {
        const totalPages = Math.ceil(forecastData.length / entriesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
            updatePagination();
        }
    });


    // Adding new filters and sorting functionality
function sortTemperatureAscending() {
    forecastData.sort((a, b) => a.main.temp - b.main.temp);
    updateTable();
    updatePagination();
}

function sortTemperatureDescending() {
    forecastData.sort((a, b) => b.main.temp - a.main.temp);
    updateTable();
    updatePagination();
}

function filterRainyDays() {
    const rainyDays = forecastData.filter(entry => entry.weather[0].main.toLowerCase().includes('rain'));
    forecastData = rainyDays;
    updateTable();
    updatePagination();
}

function findHighestTemperatureDay() {
    const highestTempDay = forecastData.reduce((max, entry) => entry.main.temp > max.main.temp ? entry : max, forecastData[0]);
    alert(`The day with the highest temperature is: ${new Date(highestTempDay.dt * 1000).toLocaleDateString()} with ${highestTempDay.main.temp}°${currentUnit === 'metric' ? 'C' : 'F'}`);
}

// Sorting buttons for temperature
$('#sort-asc').on('click', function() {
    sortTemperatureAscending();
});

$('#sort-desc').on('click', function() {
    sortTemperatureDescending();
});

// Filtering button for rainy days
$('#filter-rain').on('click', function() {
    filterRainyDays();
});

// Button to find highest temperature day
$('#find-highest').on('click', function() {
    findHighestTemperatureDay();
});




function fetchForecastData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${currentUnit}`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data) {
            displayForecastData(data);
            hideLoadingSpinner();
        },
        error: function() {
            displayErrorMessage('Forecast data not found or API request failed');
        }
    });
}

    // Make sure to expose the fetchForecastData function globally if it's not already
    window.fetchForecastData = fetchForecastData;
});
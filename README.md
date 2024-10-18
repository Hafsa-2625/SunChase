
# Weather Dashboard with Chatbot Integration

## Overview
This project is a fully responsive weather dashboard that provides real-time weather information, a 5-day weather forecast, and weather condition trends displayed using charts. It also features a chatbot to answer weather-related questions. The dashboard fetches data from the OpenWeather API and allows users to toggle between Celsius and Fahrenheit units. It includes geolocation support to detect the user's location and display weather data accordingly.

## Features
- Real-time Weather Data: Displays current weather conditions including temperature, humidity, wind speed, and weather description.
- 5-Day Forecast: Provides a detailed 5-day forecast with pagination for every 3 hours of weather data.
- Unit Conversion: Toggle between Celsius and Fahrenheit for temperature display.
- Geolocation Support: Detects user location automatically and displays weather data for that location.
- Weather Charts: Displays three types of charts for better weather trend visualization:
  - Temperature Bar Chart (5-Day Forecast)
  - Weather Condition Doughnut Chart
  - Temperature Line Chart
- Chatbot Integration: Ask the chatbot for weather information using natural language.
- Pagination for Forecast: View forecast in pages for a clean, structured display.
  
## Technologies Used
- HTML, CSS, JavaScript: For the front-end structure, style, and functionality.
- Chart.js: For dynamic weather-related charts.
- OpenWeather API: For real-time weather data and forecast.
- Dialogflow API: For chatbot integration to answer weather-related questions.
- jQuery: Simplifies DOM manipulation and API requests.
- Tailwind CSS: For responsive design and styling.

## Pages
- Home: Displays the current weather widget and the weather charts below.
- Table: Displays the 5-day weather forecast with pagination inside a table widget.

## How to Use
1. Search for a City: Use the search bar to enter a city name and get weather data.
2. Geolocation: Click the "Use My Location" button to automatically fetch weather based on your current location.
3. Toggle Temperature Unit: Switch between Celsius (°C) and Fahrenheit (°F) using the toggle switch.
4. Check Forecast: Navigate to the forecast table to see weather predictions for the next 5 days, with options to paginate through the data.
5. Use the Chatbot: Ask weather-related questions such as "What's the temperature today?" or "Will it rain tomorrow?" and get instant responses.

## Installation and Setup
To run this project locally, follow these steps:

### Prerequisites
Make sure you have the following installed on your machine:
- A web browser
- Internet connection (for fetching data from APIs)

### Steps
1. Clone the repository:
   bash
   git clone https://github.com/your-username/weather-dashboard.git
   
2. Navigate to the project directory:
   bash
   cd weather-dashboard
   
3. Open the `index.html` file** in your preferred web browser.

4. Customize the API key:
   Open the `app.js` file and replace the `apiKey` value with your own API key from [OpenWeather](https://openweathermap.org/).
   javascript
   const apiKey = 'your-api-key-here';
   

### Deployment
You can deploy this website using GitHub Pages. Follow the steps:
1. Commit your project to a GitHub repository.
2. In the repository, go to **Settings > Pages**.
3. Under Source, select the branch to deploy from (usually `main` or `master`).
4. Click Save, and your website will be deployed at `https://<username>.github.io/<repository-name>`.

## API Documentation
- OpenWeather API: [Documentation](https://openweathermap.org/api)
- Dialogflow API: [Documentation](https://cloud.google.com/dialogflow/docs)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots
Include screenshots of your weather dashboard here, showcasing its features like charts, forecast, and chatbot.

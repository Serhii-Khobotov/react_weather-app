# Weather Forecast Web App

A simple and responsive web application for viewing current weather conditions by city name.

## Task

**Goal:**  
Create a web application that fetches and displays weather data.

**Requirements:**
- Use any public weather API (e.g., [OpenWeatherMap](https://openweathermap.org/api)).
- Provide an input field for entering a city name and a button to fetch the weather.
- Display:
  - Current temperature  
  - Weather description  
  - Humidity  
  - Wind speed
- Design a clean and simple UI with styles that visually reflect different weather conditions (e.g., sunny, rainy, snowy).
- Implement a caching mechanism to prevent repeated API requests for the same city within **10 minutes**.

---

## Technologies Used

- **React + TypeScript**
- **Tailwind CSS** for styling
- **OpenWeatherMap API**
- **LocalStorage** for caching responses

---

## Features

- Real-time weather data fetching  
- Error handling for invalid city names  
- Input focus management for user convenience  
- Weather data caching (10 minutes) to optimize API usage  
- Adaptive and user-friendly design  

---

## Caching Logic

When the user searches for a city:
1. The app checks `localStorage` for a cached result.
2. If the data is less than **10 minutes old**, it’s displayed instantly.
3. Otherwise, the app fetches new data from the API and updates the cache.

---

## Live Demo

**[View the deployed app on GitHub Pages](https://Serhii-Khobotov.github.io/react_weather-app/)**

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Serhii-Khobotov/react_weather-app.git

# Navigate into the project folder
cd weather-app

# Install dependencies
npm install

# Run the app
npm run dev

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const btn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const loadingMessage = document.getElementById("loading-message");  // add this in HTML/CSS
  
  const apiKey = "0fc4a5f06f3e2cd29428bfe0a7b62f9c";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  
  function kelvinToCelsius(kelvin) {
    return `${(kelvin - 273.15).toFixed(2)}°C`;
  }
  
  function showLoading() {
    loadingMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");
  }
  
  function hideLoading() {
    loadingMessage.classList.add("hidden");
  }
  
  function displayWeather(data) {
    cityNameDisplay.textContent = data.name;
    descriptionDisplay.textContent = data.weather[0].description;
    temperatureDisplay.textContent = kelvinToCelsius(data.main.temp);
    
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  
  function displayError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
  
  async function fetchWeather(city) {
    const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      }
      const data = await response.json();
      return data;
    } catch (err) {
      // network error or parsing error
      throw err;
    }
  }
  
  async function handleGetWeather() {
    const city = cityInput.value.trim();
    if (!city) {
      displayError("Please enter a city name");
      return;
    }
    cityInput.value = "";
    showLoading();
    try {
      const data = await fetchWeather(city);
      displayWeather(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
      displayError(err.message || "Something went wrong. Please try again.");
    } finally {
      hideLoading();
    }
  }
  
  btn.addEventListener("click", handleGetWeather);
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleGetWeather();
    }
  });
});

document.addEventListener("DOMContentLoaded",()=>{
  let cityNameInput = document.getElementById("city-input");
  const btn = document.getElementById("get-weather-btn");
  const weatherInfoContainer = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name"); //Inside Weather Container
  const temperatureDisplay = document.getElementById("temperature"); //Inside Weather Container
  const descriptionDisplay = document.getElementById("description"); //Inside Weather Container
  const errorMessage = document.getElementById("error-message");
  const apiKey = "0fc4a5f06f3e2cd29428bfe0a7b62f9c";

  function TEMP_Kelvin_to_Celsius(temp){
    return `${(temp-273.15).toFixed(2)}&deg;C`
  }

  function displayWeatherDetails(data){
    cityNameDisplay.innerText =`${data.name}`;
    descriptionDisplay.innerHTML = `${data.weather[0].description}`

    const tempurature = data.main.temp;
    temperatureDisplay.innerHTML = TEMP_Kelvin_to_Celsius(tempurature);

    weatherInfoContainer.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function displayError(){
    weatherInfoContainer.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }

  function getCityName(){
    const cityName = cityNameInput.value.trim();  
    cityNameInput.value = ""
    if (cityName === "")  return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
      .then((response)=> {
        if (!response.ok){
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
      return response.json();
      })
      
      .then(data=>{
      console.log(data);
      displayWeatherDetails(data);
      
      }).catch(error=>{
        console.log("Fetch error:",error);
        displayError()
      })
  }

  btn.addEventListener("click",()=>getCityName());
})
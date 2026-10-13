const API_KEY = "ef073344a0084a648e7232647260302";
const API_URL = "https://api.weatherapi.com/v1/current.json";

// get references to the elements we will fill in
const input = document.getElementById("city-input");
const btn = document.getElementById("search-btn");
const bg = document.querySelector(".bg-overlay");

// "location" is a reserved browser name, so this one is cityName
const cityName = document.getElementById("location");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");

// get the weather for a city and fill in the page
async function getWeather(city) {
    cityName.textContent = "Loading...";

    try {
        const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
        const res = await fetch(url);
        const data = await res.json();

        // weatherapi sends back an error object for bad requests
        if (data.error) {
            cityName.textContent = "Error: " + data.error.message;
            return;
        }

        // fill in the page with the data from the API response
        const loc = data.location;
        const curr = data.current;
        
        // display the city name and region, temperature, condition, icon, humidity, wind speed, and feels like temperature
        cityName.textContent = `${loc.name}, ${loc.region}`;
        temp.textContent = Math.round(curr.temp_c) + "°C";
        condition.textContent = curr.condition.text;
        icon.src = "https:" + curr.condition.icon;
        humidity.textContent = curr.humidity + "%";
        wind.textContent = Math.round(curr.wind_kph) + " kmph";
        feels.textContent = Math.round(curr.feelslike_c) + "°C";

        // change the text color based on the background
        bg.style.background = curr.is_day
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";

    } catch (error) {
        cityName.textContent = "Error loading weather";
    }
}

// search for the city in the input box and get the weather
function search() {
    const city = input.value.trim();
    if (city) getWeather(city);
}

// search when the button is clicked
btn.addEventListener("click", search);

//  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
;

// show the first city when the page opens
getWeather(input.value);

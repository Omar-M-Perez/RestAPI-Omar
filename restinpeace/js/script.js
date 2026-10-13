const API_KEY = "ef073344a0084a648e7232647260302";
const API_URL = "https://api.weatherapi.com/v1/current.json";

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

        const loc = data.location;
        const curr = data.current;

        cityName.textContent = `${loc.name}, ${loc.region}`;
        temp.textContent = Math.round(curr.temp_f) + "°F";
        condition.textContent = curr.condition.text;
        icon.src = "https:" + curr.condition.icon;
        humidity.textContent = curr.humidity + "%";
        wind.textContent = Math.round(curr.wind_mph) + " mph";
        feels.textContent = Math.round(curr.feelslike_f) + "°F";

        // lighter background in the day, darker at night
        bg.style.background = curr.is_day
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";

    } catch (error) {
        cityName.textContent = "Error loading weather";
    }
}

function search() {
    const city = input.value.trim();
    if (city) getWeather(city);
}

btn.addEventListener("click", search);

// pressing Enter also searches
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
});

// show the first city when the page opens
getWeather(input.value);

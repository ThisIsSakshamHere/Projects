const apiKey = "4c45f89e98f0455e93a123435262404";
function getAQIText(index) {
    const levels = {
        1: "Good",
        2: "Moderate",
        3: "Unhealthy (Sensitive)",
        4: "Unhealthy",
        5: "Very Unhealthy",
        6: "Hazardous"
    };
    return levels[index] || "Unknown";
}

function updateDate() {
    const dateElement = document.querySelector(".weather-card-date");

    const now = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    dateElement.innerText = now.toLocaleDateString("en-US", options);
}

async function fetchWeather(city = "Noida") {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("City not found ❌");
            return;
        }
        document.getElementById("weather-location").innerText = data.location.name;
        document.querySelector(".weather-card-country").innerText = data.location.country;
        document.querySelector(".weather-temperature").innerText = data.current.temp_c + "°C";
        document.querySelector(".weather-condition").innerText = data.current.condition.text;
        const aqiIndex = data.current.air_quality["us-epa-index"];
        document.getElementById("aqi").innerText =
            "AQI: " + getAQIText(aqiIndex);

        updateDate();

    } catch (error) {
        console.error("FULL ERROR:", error);
        alert("Error: " + error.message);
    }
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = "";
        }
    }
});

document.getElementById("themeToggle")
    .addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

fetchWeather();
updateDate();
const weatherBox = document.getElementById("weather");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const description = document.getElementById("description");

const CACHE_KEY = "weather-cache";
const TTL = 10 * 60 * 1000;

const weatherDescriptions = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Snow",
  80: "Rain Showers",
  95: "Thunderstorm",
};

const DEFAULT_CITY = {
  name: "London",
  latitude: 51.5072,
  longitude: -0.1276,
};

function showLoading(show) {
  loading.classList.toggle("hidden", !show);
}

function showError(msg = "") {
  error.textContent = msg;
}

function getCache(city) {
  const raw = sessionStorage.getItem(CACHE_KEY);

  if (!raw) return null;

  const cache = JSON.parse(raw);

  if (cache.city === city && Date.now() - cache.time < TTL) {
    return cache.data;
  }

  return null;
}

function saveCache(city, data) {
  sessionStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      city,
      data,
      time: Date.now(),
    }),
  );
}

async function fetchWeather(city, lat, lon) {
  const cached = getCache(city);

  if (cached) return cached;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Unable to fetch weather.");
  }

  const json = await res.json();

  const data = {
    temperature: json.current.temperature_2m,
    wind: json.current.wind_speed_10m,
    code: json.current.weather_code,
  };

  saveCache(city, data);

  return data;
}

async function loadWeather(city) {
  weatherBox.classList.add("hidden");
  showError("");
  showLoading(true);

  try {
    const weather = await fetchWeather(
      city.name,
      city.latitude,
      city.longitude,
    );

    cityName.textContent = city.name;
    temperature.textContent = weather.temperature;
    wind.textContent = weather.wind;
    description.textContent = weatherDescriptions[weather.code] || "Unknown";

    weatherBox.classList.remove("hidden");
  } catch (e) {
    showError(e.message);
  } finally {
    showLoading(false);
  }
}

async function searchCities(query) {
  if (!query) {
    suggestions.innerHTML = "";
    return;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`;

    const res = await fetch(url);

    const data = await res.json();

    suggestions.innerHTML = "";

    (data.results || []).forEach((city) => {
      const li = document.createElement("li");

      li.textContent = `${city.name}, ${city.country}`;

      li.onclick = () => {
        cityInput.value = `${city.name}, ${city.country}`;

        suggestions.innerHTML = "";

        loadWeather(city);
      };

      suggestions.appendChild(li);
    });
  } catch {
    showError("Failed to search cities.");
  }
}

let debounce;

cityInput.addEventListener("input", (e) => {
  clearTimeout(debounce);

  debounce = setTimeout(() => {
    searchCities(e.target.value.trim());
  }, 400);
});

loadWeather(DEFAULT_CITY);

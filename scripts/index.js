// Daily Special Generator
function generateDailySpecial() {
  const specialDrinks = [
    "Honey Cinnamon Latte",
    "Caramel Macchiato",
    "Vanilla Almond Cappuccino",
    "Maple Bourbon Latte",
    "Lavender Honey Latte",
    "Hazelnut Mocha",
    "Brown Sugar Cinnamon Cold Brew",
    "Cardamom Rose Latte",
    "Pumpkin Spice Latte",
    "White Chocolate Peppermint Mocha",
    "Coconut Cream Latte",
    "Salted Caramel Cold Brew",
  ];

  // Get current date and create a seed for consistent daily selection
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );

  // Use day of year as seed for consistent daily random selection
  const randomIndex = dayOfYear % specialDrinks.length;
  const specialDrink = specialDrinks[randomIndex];

  // Update the DOM
  const specialElement = document.querySelector(".menu__daily-special-drink");
  if (specialElement) {
    specialElement.textContent = specialDrink;
  }
}

// Weather Fetcher for Mt. Rainier
async function fetchMtRainierWeather() {
  const weatherContent = document.getElementById("weatherContent");

  try {
    // Mt. Rainier coordinates (Paradise visitor center area)
    const lat = 46.7864;
    const lon = -121.7365;

    // Using Open-Meteo API (free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/Los_Angeles`,
    );

    if (!response.ok) throw new Error("Weather data unavailable");

    const data = await response.json();
    const current = data.current;

    // Weather code to description mapping
    const weatherDescriptions = {
      0: "☀️ Clear",
      1: "🌤️ Mostly Clear",
      2: "⛅ Partly Cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Foggy",
      48: "🌫️ Foggy",
      51: "🌦️ Light Drizzle",
      53: "🌦️ Drizzle",
      55: "🌧️ Heavy Drizzle",
      61: "🌧️ Light Rain",
      63: "🌧️ Rain",
      65: "🌧️ Heavy Rain",
      71: "🌨️ Light Snow",
      73: "❄️ Snow",
      75: "❄️ Heavy Snow",
      77: "❄️ Snow Grains",
      80: "🌦️ Light Showers",
      81: "🌧️ Showers",
      82: "🌧️ Heavy Showers",
      85: "🌨️ Light Snow Showers",
      86: "❄️ Snow Showers",
      95: "⛈️ Thunderstorm",
      96: "⛈️ Thunderstorm with Hail",
      99: "⛈️ Severe Thunderstorm",
    };

    const weatherDesc =
      weatherDescriptions[current.weather_code] || "🌤️ Varied";
    const temp = Math.round(current.temperature_2m);
    const windSpeed = Math.round(current.wind_speed_10m);

    weatherContent.innerHTML = `
      <p class="nav__weather-condition">${weatherDesc}</p>
      <p class="nav__weather-temp">${temp}°F</p>
      <p class="nav__weather-wind">${windSpeed} mph</p>
    `;
  } catch (error) {
    weatherContent.innerHTML = `
      <p class="nav__weather-error">Unavailable</p>
    `;
    console.error("Weather fetch error:", error);
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Background Music Player (YouTube)
let player;
let isPlaying = false;
let playerReady = false;

// Lo-fi café music playlist videos (YouTube IDs)
// Using regular videos (not live streams) that allow embedding
const musicVideos = [
  "lTRiuFIWV54", // Relaxing Jazz Piano Radio - Slow Jazz Music
  "Dx5qFachd3A", // Lofi hip hop mix - Beats to Relax/Study to
  "4xDzrJKXOOY", // Smooth Lounge Piano Jazz
];

let currentVideoIndex = 0;

// YouTube IFrame API ready callback
window.onYouTubeIframeAPIReady = function () {
  console.log("YouTube API Ready - Initializing player...");
  player = new YT.Player("youtube-player", {
    height: "0",
    width: "0",
    videoId: musicVideos[currentVideoIndex],
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: musicVideos.join(","),
      enablejsapi: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

function onPlayerReady(event) {
  console.log("Player ready!");
  // Set volume to 30% for background music
  player.setVolume(30);
  playerReady = true;

  // Enable the music button
  const musicButton = document.getElementById("musicToggle");
  if (musicButton) {
    musicButton.disabled = false;
    musicButton.title = "Click to play background music";
    console.log("Music button enabled");
  }
}

function onPlayerStateChange(event) {
  // If video ends, play next one
  if (event.data === YT.PlayerState.ENDED) {
    currentVideoIndex = (currentVideoIndex + 1) % musicVideos.length;
    player.loadVideoById(musicVideos[currentVideoIndex]);
  }
}

function toggleMusic() {
  const musicButton = document.getElementById("musicToggle");

  if (!playerReady || !player || !player.playVideo) {
    console.error("YouTube player not ready yet, please wait...");
    return;
  }

  if (isPlaying) {
    player.pauseVideo();
    musicButton.classList.remove("playing");
    isPlaying = false;
  } else {
    player.playVideo();
    musicButton.classList.add("playing");
    isPlaying = true;
  }
}

// Observe all elements with fade-in-up-scroll class
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in-up-scroll");
  animatedElements.forEach((el) => observer.observe(el));

  // Generate daily special on page load
  generateDailySpecial();

  // Fetch Mt. Rainier weather on page load
  fetchMtRainierWeather();

  // Setup music toggle button
  const musicToggle = document.getElementById("musicToggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
    console.log("Music toggle button listener attached");
  }

  // Initialize YouTube player after a delay if API didn't call it
  setTimeout(() => {
    if (typeof YT !== "undefined" && !playerReady) {
      console.log("Manually initializing YouTube player...");
      window.onYouTubeIframeAPIReady();
    }
  }, 2000);
});

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("back-to-top_visible");
  } else {
    backToTopButton.classList.remove("back-to-top_visible");
  }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

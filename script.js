class LocationWeather {
    constructor(apiKey, geocodingURL, weatherURL, locations, limit) {
        // Initialize class properties with provided parameters
        this.apiKey = apiKey;
        this.locations = locations;
        this.limit = limit;
        this.geocodingURL = geocodingURL;
        this.weatherURL = weatherURL;

        // Initialize properties for weather data, setting them as 'Empty' initially
        this.lattitude = 'Empty';
        this.longitude = 'Empty';
        this.weathers = 'Empty';
        this.temp = 'Empty';
        this.wind_speed = 'Empty';
    }

    // Asynchronous function to fetch location coordinates using geocoding
    async checkCoordinate() {
        const response = await fetch(`${this.geocodingURL}q=${this.locations}&limit=${this.limit}&appid=${this.apiKey}`);
        let data = await response.json();
        console.log(data);

        if (data.length > 0) {
            // If coordinates are available, store them in instance variables
            this.lattitude = data[0].lat;
            this.longitude = data[0].lon;
        }

        console.log("Latitude: " + this.lattitude);
        console.log("Longitude: " + this.longitude);
    }

    // Asynchronous function to fetch weather data using stored coordinates
    async checkWeather() {
        const response = await fetch(`${this.weatherURL}&lat=${this.lattitude}&lon=${this.longitude}&appid=${this.apiKey}`);
        let data = await response.json();
        console.log(data);

        if (data.weather.length > 0) {
            // If weather data is available, store it in instance variables
            this.weathers = data.weather[0].main;
            this.temp = data.main.temp;
            this.wind_speed = data.wind.speed;
        }

        console.log("Locations: " + this.locations);
        console.log("Weather: " + this.weathers);
        console.log("Temperature: " + this.temp);
        console.log("Wind Speed: " + this.wind_speed);

        // Update the text content in the UI
        this.updateText();

        // Update the weather icons accoring to the weather
        this.updateImages();
    }

    // Update the text content in the UI based on stored weather data
    updateText() {
        document.querySelector('.city-name').textContent = this.locations;
        document.querySelector('.current-weather').textContent = this.weathers;
        document.querySelector('.temp-text').textContent = Math.round(this.temp) + "°C";
        document.querySelector('.wind-text').textContent = this.wind_speed + "km/h";
    }

    // Placeholder for a method to update images (currently empty)
    updateImages() {
        if (this.weathers == "Clear") {
            weatherIcon.src = "icons/sun-solid.svg";
        }

        else if (this.weathers == "Clouds") {
            weatherIcon.src = "icons/cloud-solid.svg";
        }
        
        else if (this.weathers == "Rain") {
            weatherIcon.src = "icons/cloud-showers-heavy-solid.svg";
        }

        else if (this.weathers == "Thunderstorm") {
            weatherIcon.src = "icons/poo-storm-solid.svg";
        }

        else if (this.weathers == "Drizzle") {
            weatherIcon.src = "icons/cloud-rain-solid.svg";
        }

        else if (this.weathers == "Snow") {
            weatherIcon.src = "icons/snowflake-solid.svg";
        }

        else {
            weatherIcon.src = "icons/cloud-solid.svg";
        }
    }
}

// Constants for API key, URLs, and default location
const apiKey = "308ad85f20f7b9c25371433b289498c2";
const geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
let locations = 'Surabaya'; // Default location
const limit = 5;

// Select elements from the DOM
const searchBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-container img')

// Create an instance of LocationWeather with the provided parameters
const loc = new LocationWeather(apiKey, geocodingURL, weatherURL, locations, limit);

// for default location
console.log(loc.locations);
// Perform location and weather checks asynchronously
loc.checkCoordinate()
    .then(() => {
        return loc.checkWeather();
    })
    .catch(error => console.error(error));

// Add an event listener to the search button to initiate location and weather checks
searchBtn.addEventListener("click", () => {
    // Update the 'locations' property with the user's input
    loc.locations = searchBox.value;
    console.log(loc.locations);

    // Perform location and weather checks asynchronously
    loc.checkCoordinate()
        .then(() => {
            return loc.checkWeather();
        })
        .catch(error => console.error(error));
})

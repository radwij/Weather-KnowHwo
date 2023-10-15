class LocationWeather {
    constructor(apiKey, geocodingURL, weatherURL, locations, limit) {
        this.apiKey = apiKey;
        this.locations = locations;
        this.limit = limit;
        this.geocodingURL = geocodingURL;
        this.weatherURL = weatherURL;
        this.lattitude = 'Empty';
        this.longitude = 'Empty';
        this.weathers = 'Empty';
        this.temp = 'Empty';
        this.wind_speed = 'Empty';
    }


    async checkCoordinate() {
        const response = await fetch(`${this.geocodingURL}q=${this.locations}&limit=${this.limit}&appid=${this.apiKey}`);
        let data = await response.json();
        console.log(data);
        
        if (data.length > 0) {
            this.lattitude = data[0].lat;
            this.longitude = data[0].lon;
        }

        console.log("Latitude: " + this.lattitude);
        console.log("Longitude: " + this.longitude);
    }

    async checkWeather() {
        const response = await fetch(`${this.weatherURL}&lat=${this.lattitude}&lon=${this.longitude}&appid=${this.apiKey}`);
        let data = await response.json();
        console.log(data);

        if (data.weather.length > 0) { 
            this.weathers = data.weather[0].main;
            this.temp = data.main.temp;
            this.wind_speed = data.wind.speed;
        }

        console.log("Locations: " + this.locations);
        console.log("Weather: " + this.weathers);
        console.log("Temperature: " + this.temp);
        console.log("Wind Speed: " + this.wind_speed);

        this.updateText();
    }


    updateText() {
        document.querySelector('.city-name').textContent = this.locations;
        document.querySelector('.current-weather').textContent = this.weathers;
        document.querySelector('.temp-text').textContent = Math.round(this.temp) + "°C";
        document.querySelector('.wind-text').textContent = this.wind_speed + "km/h";
    }

    updateImages() {

    }
}

    const apiKey = "308ad85f20f7b9c25371433b289498c2";
    const geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?";
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    let locations = 'Surabaya';
    const limit = 5;

    const searchBox = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    const loc = new LocationWeather(apiKey, geocodingURL, weatherURL, locations, limit);

    searchBtn.addEventListener("click", ()=> {
        loc.locations = searchBox.value;
        console.log(loc.locations);
        
        loc.checkCoordinate()
        .then(() => {
                return loc.checkWeather();
            }
        )
    
        .catch(error => console.error(error));
    })


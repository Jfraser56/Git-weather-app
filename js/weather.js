export class Weather {
  constructor() {
    this.key = "520bc5980f405e1353cf93f5f22ac1dd";
  }

  async fetchWeather(city, container, location) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}`
      );
      const data = await response.json();

      //Return needed INFO
      return {
        desc: data.weather[0].description,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        clouds: data.clouds,
        main: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
      };
    } catch (err) {
      err.message = "Error: Location not found";
      location.textContent = err.message;
      container.className = "container err";
    }
  }

  getDescription(weatherInfo) {
    const description = weatherInfo.then((res) => res.desc);
    return description;
  }

  calcTemp(weatherInfo) {
    const temperature = weatherInfo
      .then((res) => res.temp)
      .then((data) => Math.round((data - 273.15) * (9 / 5) + 32));

    return temperature;
  }

  getMain(weatherInfo) {
    const main = weatherInfo.then((res) => res.main);
    return main;
  }

  calcWind(weatherInfo) {
    const windDirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

    const windDirection = weatherInfo
      .then((res) => res.windDirection)
      .then((data) => Math.round(data / 45))
      .then((direction) => windDirs[direction]);

    const windSpeed = weatherInfo.then((res) => res.windSpeed);

    return {
      windDirection,
      windSpeed,
    };
  }

  cloudCover(weatherInfo) {
    const cloudInfo = weatherInfo
      .then((res) => res.clouds.all)
      .then((data) => `${data}`);

    return cloudInfo;
  }

  getHumidity(weatherInfo) {
    const humidity = weatherInfo.then((res) => `${res.humidity}`);

    return humidity;
  }

  getPressure(weatherInfo) {
    const pressure = weatherInfo.then((res) => `${res.pressure}`);
    return pressure;
  }
}

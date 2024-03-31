import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/forecast";
import WeatherInfo from "./components/weatherInfo";

function BackgroundImage(weather) {
  if (weather.includes("cloud")) {
    return "url(https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg)"; // URL to cloudy background image
  } else if (weather.includes("rain")) {
    return "url(https://images.pexels.com/photos/325676/pexels-photo-325676.jpeg)"; // URL to rainy background image
  } else {
    return "url(https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg)"; // Default background image
  }
}

export default function App() {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = setTimeout(async () => {
      try {
        navigator.geolocation.getCurrentPosition(async function (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&q=${city}&units=metric&appid=39dd8e5ec14e5ea319ff1038f9535b49`
          );
          const data = await response.json();
          setWeatherData(data);
          console.log(data);

          const forecastData = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&q=${city}&units=metric&appid=39dd8e5ec14e5ea319ff1038f9535b49`
          );
          const res = await forecastData.json();
          setForecast(res);
          console.log(res);

          console.log(
            "weatherData.weather[0].description",
            data.weather[0].description
          );

          const backgroundImage = BackgroundImage(
            data.weather[0].description ?? "cloud"
          );

          document.documentElement.style.setProperty(
            "--background-image",
            backgroundImage
          );
        });
      } catch (error) {
        console.error(error);
        // Handle error (e.g., display error message to the user)
      }
    }, 1000);

    return () => clearTimeout(fetchData);
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="glass">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            className="custom-input"
          />
        </form>

        <WeatherInfo info={weatherData} />
        <Forecast list={forecast.list} />
      </div>
    </>
  );
}

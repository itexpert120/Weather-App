import React from "react";
import "./style.css";

function WeatherInfo({ info }) {
  if (!info || !info.main || !info.weather || info.weather.length === 0) {
    return <div>No weather information available</div>;
  }

  const { name, main, visibility, weather } = info;

  return (
    <div className="info">
      <div>
        <p>{name}</p>
        <p>feels like: {Math.round(main.feels_like)}</p>
        <p>humidity: {main.humidity}%</p>
        <p>Visibility: {visibility}km</p>
      </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <h2>{Math.round(main.temp)}°C</h2>
        <p>{weather[0].description}</p>
      </div>
    </div>
  );
}

export default WeatherInfo;

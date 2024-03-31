import React from "react";
import "./style.css";

function WeatherInfo({ info }) {
  if (!info || !info.main || !info.weather || info.weather.length === 0) {
    return <div>No weather information available</div>;
  }

  const { name, main, visibility, weather } = info;

  return (
    <>
      <h2>Current Weather</h2>
      <div className="info">
        <div>
          <h2>{name}</h2>
          <div className="other">
            <p>Feels Like: {Math.round(main.feels_like)}</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Visibility: {visibility}km</p>
          </div>
        </div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <h2 style={{ fontSize: 48 }}>{Math.round(main.temp)}°C</h2>
          <p>{weather[0].description.toUpperCase()}</p>
        </div>
      </div>
    </>
  );
}

export default WeatherInfo;

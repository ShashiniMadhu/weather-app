import React from 'react';
import { WeatherData } from '../services/api';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 hover:scale-[1.02] group">
      <div className="flex justify-between items-start mb-4">
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          <h3 className="text-2xl font-bold text-white">{weather.name}</h3>
          <p className="text-white/70 text-sm transition-colors duration-300 group-hover:text-white/90">{weather.sys.country}</p>
        </div>
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="w-16 h-16 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
        />
      </div>

      <div className="mb-4 transition-all duration-300">
        <div className="text-5xl font-bold text-white transition-all duration-300 group-hover:text-6xl">
          {Math.round(weather.main.temp)}°C
        </div>
        <p className="text-white/90 capitalize text-lg mt-2 transition-all duration-300 group-hover:text-white">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 text-sm group-hover:border-white/30 transition-colors duration-300">
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">Feels Like</p>
          <p className="text-white font-semibold">{Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">Humidity</p>
          <p className="text-white font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">Wind Speed</p>
          <p className="text-white font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">Pressure</p>
          <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
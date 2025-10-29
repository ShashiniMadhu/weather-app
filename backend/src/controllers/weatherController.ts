import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import { getCityCodes, getCities } from '../utils/cityParser';

const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY || '');

export const getAllWeather = async (req: Request, res: Response) => {
  try {
    const cityCodes = getCityCodes();
    // Limit to first 20 cities to avoid rate limiting
    const limitedCityCodes = cityCodes.slice(0, 20);
    
    const weatherData = await weatherService.getWeatherForMultipleCities(limitedCityCodes);
    
    res.json({
      success: true,
      count: weatherData.length,
      data: weatherData
    });
  } catch (error: any) {
    console.error('Error in getAllWeather:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

export const getWeatherByCity = async (req: Request, res: Response) => {
  try {
    const { cityCode } = req.params;
    const weatherData = await weatherService.getWeatherByCityCode(cityCode);
    
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error: any) {
    console.error('Error in getWeatherByCity:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

export const getCitiesList = (req: Request, res: Response) => {
  try {
    const cities = getCities();
    res.json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cities list',
      error: error.message
    });
  }
};
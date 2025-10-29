import axios from 'axios';
import NodeCache from 'node-cache';

const weatherCache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

interface WeatherData {
  name: string;
  weather: Array<{
    description: string;
    main: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  id: number;
}

export class WeatherService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCityCode(cityCode: string): Promise<WeatherData> {
    // Check cache first
    const cachedData = weatherCache.get<WeatherData>(cityCode);
    if (cachedData) {
      console.log(`Cache hit for city code: ${cityCode}`);
      return cachedData;
    }

    // Fetch from API
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          id: cityCode,
          appid: this.apiKey,
          units: 'metric' // Use metric units (Celsius)
        }
      });

      const weatherData = response.data;
      
      // Store in cache
      weatherCache.set(cityCode, weatherData);
      console.log(`Cache miss - fetched data for city code: ${cityCode}`);
      
      return weatherData;
    } catch (error: any) {
      console.error(`Error fetching weather for city ${cityCode}:`, error.message);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getWeatherForMultipleCities(cityCodes: string[]): Promise<WeatherData[]> {
    const promises = cityCodes.map(code => this.getWeatherByCityCode(code));
    const results = await Promise.allSettled(promises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<WeatherData> => result.status === 'fulfilled')
      .map(result => result.value);
  }
}
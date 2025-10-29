import citiesData from '../data/cities.json';

interface City {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
}

interface CitiesJson {
  List: City[];
}

export const getCityCodes = (): string[] => {
  const data = citiesData as CitiesJson;
  return data.List.map(city => city.CityCode);
};

export const getCities = (): City[] => {
  const data = citiesData as CitiesJson;
  return data.List;
};
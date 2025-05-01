// import { data } from "./documents/weather-fakedata";

export type WeatherResponse = {
  location: Location;
  current: CurrentDay;
  forecast: object[];
};

/*
Weather location Types extracted from this example

const location = {
  name: "Rotterdam",
  region: "South Holland",
  country: "Netherlands",
  lat: 51.9225,
  lon: 4.4792,
  tz_id: "Europe/Amsterdam",
  localtime_epoch: 1746110991,
  localtime: "2025-05-01 16:49",
};
*/
export type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type CurrentDay = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  condition: {
    text: string;
    code: number;
  };
  precip_mm?: number;
  humidity?: number;
  cloud?: number;
  feelslike_c?: number;
};
export const myCity = {
  id: 3329608,
  name: "Rotterdam",
  region: "South Holland",
  country: "Netherlands",
  lat: 51.92,
  lon: 4.48,
  url: "rotterdam-south-holland-netherlands",
};

/*
Query parameter based on which data is sent back. It could be following:

Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
city name e.g.: q=Paris
US zip e.g.: q=10001
UK postcode e.g: q=SW1
Canada postal code e.g: q=G2J
metar:<metar code> e.g: q=metar:EGLL
iata:<3 digit airport code> e.g: q=iata:DXB
auto:ip IP lookup e.g: q=auto:ip
IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1
By ID returned from Search API. e.g: q=id:2801268
*/

export type RequestWeatherType = {
  key: string;
  q: string; // CityName, see  https://www.weatherapi.com/docs/#forecast-api for more info, because it's a lot
  days: string;
  lang: string; // "nl"
  aqi: string;
  alerts: string;
};

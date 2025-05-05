// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

import { URL } from "url";
import { RequestWeatherType } from "./weather-types";
import addSearchParams from "./utils/add-search-params";

export async function getWeather(apiKey = process.env.WEATHER_API_KEY) {
  const weatherParams: RequestWeatherType = {
    key: apiKey,
    q: `Rotterdam`,
    days: "2", // must be string of numbers
    lang: "nl",
    aqi: "no",
    alerts: "no",
  };
  const fcUrl = new URL(`https://api.weatherapi.com/v1/forecast.json`);

  const finalUrl = addSearchParams(fcUrl, weatherParams);

  // const finalUrl = new URLSearchParams(weatherParams);
  // console.log("latest url: ", finalUrl.toString());

  const url = finalUrl;
  const response = await fetch(url);
  const result = await response.json();

  const responseObject = {
    description: result.forecast.forecastday[0].day.condition,
    todaysTemp: result.forecast.forecastday[0].day.maxtemp_c,
    fivedayForecast: {
      today: result.forecast.forecastday[0],
      tomorrow: result.forecast.forecastday[1],
      // dayAfterTomorrow: result.forecast.forecastday[2],
      // threeDaysFromToday: result.forecast.forecastday[3]?.day,
      // fourdDAysDaysFromToday: result.forecast.forecastday[4]?.day,
    },
  };

  return responseObject;
}

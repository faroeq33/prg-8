// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
import { data } from "./documents/weather-fakedata.ts";

export async function getWeather() {
  /*
  const apiKey = process.env.WEATHER_API_KEY;
  // const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=rotterdam&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const wUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Rotterdam&days=5&aqi=no&alerts=no`;

  const url = wUrl;
  const response = await fetch(url);
  */

  // const result = await response.json();
  // console.log(result.forecast);
  // console.log(data.forecast.forecastday[0].day.daily_will_it_rain);
  return {
    description: data.forecast.forecastday[0].day.condition,
    todaysTemp: data.forecast.forecastday[0].day.maxtemp_c,
    fivedayForecast: {
      today: data.forecast.forecastday[0],
      tomorrow: data.forecast.forecastday[1],
      dayAfterTomorrow: data.forecast.forecastday[2],
      threeDaysFromToday: data.forecast.forecastday[3]?.day,
      fourdDAysDaysFromToday: data.forecast.forecastday[4]?.day,
    },
  };
  // return result;
}

/* eslint-disable no-restricted-syntax */
import { unix } from 'moment';
import {
  // eslint-disable-next-line max-len
  convertFromKelvinToFahrenheit, convertFromKelvinToCelsius, convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius,
} from './utils/tempConverter';
import { convertFromMilesToKilometers, convertFromKilometersToMiles } from './utils/speedConverter';
import { displayData } from './DOM/dom';
import { getCoordsFromAPI, getWeatherDataFromAPI } from './utils/api';

const cityInputForm = document.getElementById('cityInputForm');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('cityInputButton');
const selectedDayFahrenheit = document.querySelector('.selectedDayFahrenheit');
const selectedDayCelsius = document.querySelector('.selectedDayCelsius');
const temperatureSpan = document.getElementById('temperatureSpan');
const windSpan = document.getElementById('windSpan');
let weeklyWeatherInfo = [];
let selectedInfoType = 'Temperature';

export const convertToFahrenheit = () => {
  if (weeklyWeatherInfo.length === 0) {
    return;
  }
  selectedDayCelsius.classList.remove('selectedTempType');
  selectedDayFahrenheit.classList.remove('selectedTempType');
  selectedDayFahrenheit.classList.add('selectedTempType');

  for (const currDay of weeklyWeatherInfo) {
    if (currDay.tempType === 'kelvin') {
      currDay.temp = Math.round(convertFromKelvinToFahrenheit(currDay.temp));
      currDay.tempNight = convertFromKelvinToFahrenheit(currDay.tempNight);
      currDay.tempType = 'fahrenheit';
    } else if (currDay.tempType === 'celsius') {
      currDay.temp = Math.round(convertFromCelsiusToFahrenheit(currDay.temp));
      currDay.tempNight = convertFromCelsiusToFahrenheit(currDay.tempNight);
      currDay.tempType = 'fahrenheit';
    }

    if (currDay.windSpeedType === 'kilometers') {
      currDay.windSpeed = Math.round(convertFromKilometersToMiles(currDay.windSpeed));
      currDay.windSpeedType = 'miles';
    }
  }

  displayData(weeklyWeatherInfo, selectedInfoType);
};

export const convertToCelsius = () => {
  if (weeklyWeatherInfo.length === 0) {
    return;
  }

  selectedDayFahrenheit.classList.remove('selectedTempType');
  selectedDayCelsius.classList.remove('selectedTempType');
  selectedDayCelsius.classList.add('selectedTempType');

  for (const currDay of weeklyWeatherInfo) {
    if (currDay.tempType === 'kelvin') {
      currDay.temp = Math.round(convertFromKelvinToCelsius(currDay.temp));
      currDay.tempNight = Math.round(convertFromKelvinToCelsius(currDay.tempNight));
      currDay.tempType = 'celsius';
    } else if (currDay.tempType === 'fahrenheit') {
      currDay.temp = Number(Math.round(convertFromFahrenheitToCelsius(currDay.temp)));
      currDay.tempNight = Number(Math.round(convertFromFahrenheitToCelsius(currDay.tempNight)));
      currDay.tempType = 'celsius';
    }

    if (currDay.windSpeedType === 'miles') {
      currDay.windSpeed = Math.round((convertFromMilesToKilometers(currDay.windSpeed)));
      currDay.windSpeedType = 'kilometers';
    }
  }

  displayData(weeklyWeatherInfo, selectedInfoType);
};

const fetchFromAPI = async (location) => {
  const [latitude, longitude, locationName] = await getCoordsFromAPI(location);
  const data = await getWeatherDataFromAPI(latitude, longitude);

  for (const currDay of data) {
    const dayInfo = {
      locationName,
      day: unix(currDay.dt).format('LLLL'),
      temp: currDay.temp.day,
      tempNight: currDay.temp.night,
      tempType: 'kelvin',
      feelsLike: currDay.feels_like.day,
      humidity: currDay.humidity,
      sunrise: unix(currDay.sunrise).format('LLLL'),
      sunset: unix(currDay.sunset).format('LLLL'),
      weatherMain: currDay.weather[0].main,
      weatherDescription: currDay.weather[0].description,
      iconSrc: `http://openweathermap.org/img/w/${currDay.weather[0].icon}.png`,
      windSpeed: Math.round(currDay.wind_speed),
      windSpeedType: 'miles',
    };

    weeklyWeatherInfo.push(dayInfo);
  }

  convertToFahrenheit();
  displayData(weeklyWeatherInfo, selectedInfoType);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const location = cityInput.value;

  if (location === '') {
    return;
  }

  weeklyWeatherInfo = [];
  fetchFromAPI(location);
};

const displayDefaultCityWeatherInfo = () => {
  cityInput.value = 'London';
  searchButton.click();
};

const displayTempChart = () => {
  if (selectedInfoType === 'Temperature') {
    return;
  }
  windSpan.classList.remove('selectedChartType');
  temperatureSpan.classList.add('selectedChartType');
  selectedInfoType = 'Temperature';
  displayData(weeklyWeatherInfo, selectedInfoType);
};

const displayWindSpeedChart = () => {
  if (selectedInfoType === 'Wind Speeds') {
    return;
  }
  temperatureSpan.classList.remove('selectedChartType');
  windSpan.classList.add('selectedChartType');
  selectedInfoType = 'Wind Speeds';
  displayData(weeklyWeatherInfo, selectedInfoType);
};

cityInputForm.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit);
selectedDayFahrenheit.addEventListener('click', convertToFahrenheit);
selectedDayCelsius.addEventListener('click', convertToCelsius);
temperatureSpan.addEventListener('click', displayTempChart);
windSpan.addEventListener('click', displayWindSpeedChart);

displayDefaultCityWeatherInfo();

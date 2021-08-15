import { convertFromKelvinToFahrenheit, convertFromKelvinToCelsius, convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius} from './utils/tempConverter'
import { displayData } from './DOM/dom'
import { getCoordsFromAPI, getWeatherDataFromAPI } from './utils/api'
import { unix } from 'moment'

const cityInputForm = document.getElementById('cityInputForm')
const cityInput = document.getElementById('cityInput')
const searchButton = document.getElementById('cityInputButton')
const fahrenheit = document.getElementById('fahrenheit')
const celsius = document.getElementById('celsius')
const selectedDayFarenheit = document.querySelector('.selectedDayFarenheit')
const selectedDayCelsius = document.querySelector('.selectedDayCelsius')
let weeklyWeatherInfo = []

const handleSubmit = (event) => {
  event.preventDefault()
  const location = cityInput.value
  
  weeklyWeatherInfo = []
  fetchFromAPI(location)

  return false
}

const fetchFromAPI = async (location) => {
  const [latitude, longitude, locationName] = await getCoordsFromAPI(location)
  const data = await getWeatherDataFromAPI(latitude, longitude)
  console.log(latitude)
  console.log(longitude)
  console.log(data)


  for (let currDay of data) {
    const dayInfo = {
      locationName: locationName, 
      day:  unix(currDay.dt).format('LLLL'),
      temp: currDay.temp.day,
      tempNight: currDay.temp.night,
      tempType: 'kelvin',
      feelsLike: currDay.feels_like.day,
      humidity: currDay.humidity,
      sunrise: unix(currDay.sunrise).format('LLLL'),
      sunset:  unix(currDay.sunset).format('LLLL'),
      weatherMain: currDay.weather[0].main,
      weatherDescription: currDay.weather[0].description,
      iconSrc: `http://openweathermap.org/img/w/${currDay.weather[0].icon}.png`,
      windSpeed: currDay.wind_speed,
    }
  
    weeklyWeatherInfo.push(dayInfo)
  }

  console.log(weeklyWeatherInfo)
  convertToFahrenheit()
  displayData(weeklyWeatherInfo)
}

export const convertToFahrenheit = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }

  console.log(weeklyWeatherInfo)

  for (let currDay of weeklyWeatherInfo) {
    if (currDay.tempType === 'kelvin') {
      currDay.temp = convertFromKelvinToFahrenheit(currDay.temp)
      currDay.tempNight = convertFromKelvinToFahrenheit(currDay.tempNight)
      currDay.tempType = 'fahrenheit'
    } else if (currDay.tempType === 'celsius') {
      currDay.temp = convertFromCelsiusToFahrenheit(currDay.temp)
      currDay.tempNight = convertFromCelsiusToFahrenheit(currDay.tempNight)
      currDay.tempType = 'fahrenheit'
    } else if (currDay.tempType === 'fahrenheit') {
      return
    }
  }

  console.log(weeklyWeatherInfo)
}

export const convertToCelsius = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }

  for (let currDay of weeklyWeatherInfo) {
    if (currDay.tempType === 'kelvin') {
      console.log(currDay.temp)
      currDay.temp = convertFromKelvinToCelsius(currDay.temp)
      currDay.tempNight = convertFromKelvinToCelsius(currDay.tempNight)
      currDay.tempType = 'celsius'
    } else if (currDay.tempType === 'fahrenheit') {
      currDay.temp = convertFromFahrenheitToCelsius(currDay.temp)
      currDay.tempNight = convertFromFahrenheitToCelsius(currDay.tempNight)
      currDay.tempType = 'celsius'
    } else if (currDay.tempType === 'celsius') {
      return
    }
  }

  console.log(weeklyWeatherInfo)
}

searchButton.addEventListener('click', handleSubmit)
fahrenheit.addEventListener('click', convertToFahrenheit)
celsius.addEventListener('click', convertToCelsius)
selectedDayFarenheit.addEventListener('click', convertToFahrenheit)
selectedDayCelsius.addEventListener('click', convertToCelsius)

console.log('hello world')
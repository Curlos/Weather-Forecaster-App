import { convertFromKelvinToFahrenheit, convertFromKelvinToCelsius, convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius} from './utils/tempConverter'
import { convertFromMilesToKilometers, convertFromKilometersToMiles } from './utils/speedConverter'
import { displayData } from './DOM/dom'
import { getCoordsFromAPI, getWeatherDataFromAPI } from './utils/api'
import { unix } from 'moment'

const cityInputForm = document.getElementById('cityInputForm')
const cityInput = document.getElementById('cityInput')
const searchButton = document.getElementById('cityInputButton')
const selectedDayFahrenheit = document.querySelector('.selectedDayFahrenheit')
const selectedDayCelsius = document.querySelector('.selectedDayCelsius')
let weeklyWeatherInfo = []
let selectedInfoType = 'Temperature'

const handleSubmit = (event) => {
  event.preventDefault()
  const location = cityInput.value

  if (location === '') {
    return
  }
  
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
      windSpeed: Math.round(currDay.wind_speed),
      windSpeedType: 'miles'
    }
  
    weeklyWeatherInfo.push(dayInfo)
  }

  console.log(weeklyWeatherInfo)
  convertToFahrenheit()
  displayData(weeklyWeatherInfo, selectedInfoType)
}

export const convertToFahrenheit = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }
  selectedDayCelsius.classList.remove('selectedTempType')
  selectedDayFahrenheit.classList.remove('selectedTempType')
  selectedDayFahrenheit.classList.add('selectedTempType')

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
    } 

    if (currDay.windSpeedType === 'kilometers') {
      currDay.windSpeed = Math.round(convertFromKilometersToMiles(currDay.windSpeed))
      currDay.windSpeedType = 'miles'
    }
  }

  console.log(weeklyWeatherInfo)
  displayData(weeklyWeatherInfo, selectedInfoType)
}

export const convertToCelsius = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }

  selectedDayFahrenheit.classList.remove('selectedTempType')
  selectedDayCelsius.classList.remove('selectedTempType')
  selectedDayCelsius.classList.add('selectedTempType')

  for (let currDay of weeklyWeatherInfo) {
    if (currDay.tempType === 'kelvin') {
      console.log(currDay.temp)
      currDay.temp = convertFromKelvinToCelsius(currDay.temp)
      currDay.tempNight = convertFromKelvinToCelsius(currDay.tempNight)
      currDay.tempType = 'celsius'
    } else if (currDay.tempType === 'fahrenheit') {
      currDay.temp = Number(convertFromFahrenheitToCelsius(currDay.temp).toFixed(2))
      currDay.tempNight = Number(convertFromFahrenheitToCelsius(currDay.tempNight))
      currDay.tempType = 'celsius'
    } 

    if (currDay.windSpeedType === 'miles') {
      currDay.windSpeed = Math.round((convertFromMilesToKilometers(currDay.windSpeed)))
      currDay.windSpeedType = 'kilometers'
    }
  }

  console.log(weeklyWeatherInfo)
  displayData(weeklyWeatherInfo, selectedInfoType)
}

const displayDefaultCityWeatherInfo = () => {
  cityInput.value = 'London'
  searchButton.click()
}

cityInputForm.addEventListener('submit', handleSubmit)
searchButton.addEventListener('click', handleSubmit)
selectedDayFahrenheit.addEventListener('click', convertToFahrenheit)
selectedDayCelsius.addEventListener('click', convertToCelsius)

displayDefaultCityWeatherInfo()
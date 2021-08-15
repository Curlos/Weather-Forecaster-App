import { convertFromKelvinToFarenheit, convertFromKelvinToCelsius, convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius} from './utils/tempConverter'
import { getCoordsFromAPI, getWeatherDataFromAPI } from './utils/api'
import { unix } from 'moment'

const cityInputForm = document.getElementById('cityInputForm')
const cityInput = document.getElementById('cityInput')
const searchButton = document.getElementById('cityInputButton')
const fahrenheit = document.getElementById('fahrenheit')
const celsius = document.getElementById('celsius')
const weeklyWeatherInfo = []

const handleSubmit = (event) => {
  event.preventDefault()
  const location = cityInput.value
  
  console.log(location)
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

  displayData()
}

const displayData = () => {
  const weatherInfo = document.getElementById('weatherInfo')
  for (let currDay of weeklyWeatherInfo) {
    const newHTML = `Day: ${currDay.day}
    Feels like: ${currDay.feelsLike}
    Humidity: ${currDay.humidity}
    iconSrc: ${currDay.iconSrc}`

    weatherInfo.innerHTML += newHTML
  }
}

const convertToFahrenheit = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }

  for (let currDay of weeklyWeatherInfo) {

  }

}

const convertToCelsius = () => {
  if (weeklyWeatherInfo.length === 0) {
    return
  }
}

searchButton.addEventListener('click', handleSubmit)
fahrenheit.addEventListener('click', convertToFahrenheit)
celsius.addEventListener('click', convertToCelsius)

console.log('hello world')
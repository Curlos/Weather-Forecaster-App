import { convertFromKelvinToFarenheit, convertFromKelvinToCelsius} from './utils/tempConverter'
import { getCoordsFromAPI, getWeatherDataFromAPI } from './utils/api'
import moment from 'moment'

const cityInputForm = document.getElementById('cityInputForm')
const cityInput = document.getElementById('cityInput')

const handleSubmit = (event) => {
  event.preventDefault()
  const location = cityInput.value
  
  console.log(location)
  fetchFromAPI(location)
}

const fetchFromAPI = async (location) => {
  const [latitude, longitude] = await getCoordsFromAPI(location)
  const data = await getWeatherDataFromAPI(latitude, longitude)
  console.log(latitude)
  console.log(longitude)
  console.log(data)

  const firstDay = data[1]

  const firstDayInfo = {
    day:  moment.unix(firstDay.dt).format('LLLL'),
    feelsLike: firstDay.feels_like.day,
    humidity: firstDay.humidity,
    sunrise: moment.unix(firstDay.sunrise).format('LLLL'),
    sunset:  moment.unix(firstDay.sunset).format('LLLL'),
    weatherMain: firstDay.weather[0].main,
    weatherDescription: firstDay.weather[0].description,
    iconSrc: `http://openweathermap.org/img/w/${firstDay.weather[0].icon}.png`
  }

  console.log(firstDayInfo)
}

cityInputForm.addEventListener('submit', handleSubmit)


console.log('hello world')
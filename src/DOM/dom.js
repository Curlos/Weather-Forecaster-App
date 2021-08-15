import { convertToFahrenheit, convertToCelsius } from '../index'

export const displayTopInfo = (currDay) => {

  const selectedDayImg = document.querySelector('.selectedDayImg')
  const selectedDayTempNum = document.querySelector('.selectedDayTempNum')

  const humidity = document.querySelector('.humidity')
  const wind = document.querySelector('.wind')
  const windSpeedUnit = document.querySelector('.windSpeedUnit')


  const topLocation = document.querySelector('.topLocation')
  const topDay = document.querySelector('.topDay')
  const topWeatherDesc = document.querySelector('.topWeatherDesc')

  const date = new Date(currDay.day)

  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const timeAMPM = currDay.day.slice(-8).trim()
  
  selectedDayImg.src = currDay.iconSrc
  topLocation.textContent = currDay.locationName
  topDay.textContent = `${weekday} ${timeAMPM}`
  topWeatherDesc.textContent = currDay.weatherDescription

  selectedDayTempNum.textContent = currDay.temp.toFixed(2)
  humidity.textContent = `Humidity: ${currDay.humidity}%`
  wind.textContent = `Wind speed: ${currDay.windSpeed}`
  windSpeedUnit.textContent = `mph`

  console.log('changed elements')

{/* <div class="topInfo">
        <div class="topLeft">
          <img src="http://openweathermap.org/img/w/10d.png" class="selectedDayImg">
          <span class="selectedDayTemp">
            <span class="selectedDayTempNum">86</span>
            <sup class="selectedDayTempTypes">
              <span class="selectedDayFarenheit">°F</span>
              |
              <span class="selectedDayCelsius">°C</span>
            </sup>

            <span class="extraConditionsInfo">
              <span class="humidity">Humidity: 75%</span></br>
              <span class="wind">Wind: 13mph</span>
            </span>
          </span>
        </div>

        <div class="topRight">
          <div class=topLocation>Kendale Lakes, FL</div>
          <div class="topDay">Sunday</div>
          <div class="topWeatherDesc">Cloudy</div>
        </div>
      </div> */}
}

export const displayChart = () => {

}

export const displayDaysInfo = () => {

}

export const displayData = (weeklyWeatherInfo) => {
  const weatherInfo = document.getElementById('weatherInfo')

  displayTopInfo(weeklyWeatherInfo[0])
  for (let currDay of weeklyWeatherInfo) {
    return
  }
}
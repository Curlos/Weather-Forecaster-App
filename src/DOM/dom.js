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

  if (currDay.windSpeedType === 'kilometers') {
    windSpeedUnit.textContent = `km/h`
  } else {
    windSpeedUnit.textContent = `mph`
  }

  console.log('changed elements')
}

export const displayTempChart = (weeklyWeatherInfo) => {

}

export const displayWindSpeedChart = (weeklyWeatherInfo) => {

}



export const displayDaysTempInfo = (weeklyWeatherInfo) => {
  const days = document.querySelector('.days')
  days.innerHTML = ''
  
  for (let currDay of weeklyWeatherInfo) {
    const dayElem = document.createElement('span')
    dayElem.classList.add('day')
    dayElem.setAttribute('date', currDay.day)

    const date = new Date(currDay.day)

    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)

    const dayName = document.createElement('div')
    dayName.classList.add('dayName')
    dayName.textContent = weekday.slice(0,3)

    const dayImage = document.createElement('div')
    dayImage.classList.add('dayImage')

    const img = document.createElement('img')
    img.setAttribute('src', currDay.iconSrc)

    const dayTemp = document.createElement('div')
    dayTemp.classList.add('dayTemp')

    const currTemp = document.createElement('span')
    currTemp.classList.add('currTemp')
    currTemp.textContent = `${Math.round(currDay.temp)}° `

    const tempNight = document.createElement('span')
    tempNight.classList.add('nightTemp')
    tempNight.textContent = ` ${Math.round(currDay.tempNight)}°`
    

    dayImage.append(img)
    dayTemp.append(currTemp)
    dayTemp.append(tempNight)
    dayElem.append(dayName)
    dayElem.append(dayImage)
    dayElem.append(dayTemp)
    days.append(dayElem)
  }
}


export const displayData = (weeklyWeatherInfo, selectedInfoType) => {
  displayTopInfo(weeklyWeatherInfo[0])

  if (selectedInfoType === 'Temperature') {
    displayTempChart(weeklyWeatherInfo)
  } else {
    displayWindSpeedChart(weeklyWeatherInfo)
  }

  displayDaysTempInfo(weeklyWeatherInfo)
}
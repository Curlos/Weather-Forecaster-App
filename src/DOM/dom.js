let weeklyWeatherInfoData = []
let selectedDayCount = 0

const handleDayClick = (event) => {
  const elem = event.target
  const selectedDayCount = elem.getAttribute('dayCount')
  displayTopInfo(weeklyWeatherInfoData[selectedDayCount])
}

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

  selectedDayTempNum.textContent = currDay.temp
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

  let temps = []
  let days = []
  Chart.defaults.global.defaultFontColor = "#fff";
  for (let currDay of weeklyWeatherInfo) {
    const date = new Date(currDay.day)
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
    temps.push(currDay.temp)
    days.push(weekday)
  }
  let ctx = document.getElementById('myChart').getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'line',
        responsive: true,
        data: {
          labels: days,
          datasets: [{ 
              data: temps,
              label: "Weather Temperature",
              borderColor: "#FDD663",
              backgroundColor: "rgb(62,149,205,0.1)",
            }, 
          ]
        },
      });
  return myChart
}

export const displayWindSpeedChart = (weeklyWeatherInfo) => {
  let windSpeeds = []
  let days = []
  Chart.defaults.global.defaultFontColor = "#fff";
  for (let currDay of weeklyWeatherInfo) {
    const date = new Date(currDay.day)
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
    windSpeeds.push(currDay.windSpeed)
    days.push(weekday)
  }
  let ctx = document.getElementById('myChart').getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'line',
        responsive: true,
        data: {
          labels: days,
          datasets: [{ 
              data: windSpeeds,
              label: "Wind Speeds",
              borderColor: "#FDD663",
              backgroundColor: "rgb(62,149,205,0.1)",
            }, 
          ]
        },
      });
  return myChart
}

export const displayBackground = (currDay) => {

}



export const displayDaysTempInfo = (weeklyWeatherInfo) => {
  const days = document.querySelector('.days')
  days.innerHTML = ''
  let dayCount = 0
  
  for (let currDay of weeklyWeatherInfo) {
    const dayElem = document.createElement('span')
    dayElem.classList.add('day')
    dayElem.setAttribute('date', currDay.day)
    dayElem.setAttribute('dayCount', dayCount)

    const date = new Date(currDay.day)

    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)

    const dayName = document.createElement('div')
    dayName.classList.add('dayName')
    dayName.textContent = weekday.slice(0,3)
    dayName.setAttribute('dayCount', dayCount)

    const dayImage = document.createElement('div')
    dayImage.classList.add('dayImage')
    dayImage.setAttribute('dayCount', dayCount)

    const img = document.createElement('img')
    img.setAttribute('src', currDay.iconSrc)
    img.setAttribute('dayCount', dayCount)

    const dayTemp = document.createElement('div')
    dayTemp.classList.add('dayTemp')
    dayTemp.setAttribute('dayCount', dayCount)

    const currTemp = document.createElement('span')
    currTemp.classList.add('currTemp')
    currTemp.textContent = `${Math.round(currDay.temp)}° `
    currTemp.setAttribute('dayCount', dayCount)

    const tempNight = document.createElement('span')
    tempNight.classList.add('nightTemp')
    tempNight.textContent = ` ${Math.round(currDay.tempNight)}°`
    tempNight.setAttribute('dayCount', dayCount)
    

    dayImage.append(img)
    dayTemp.append(currTemp)
    dayTemp.append(tempNight)
    dayElem.append(dayName)
    dayElem.append(dayImage)
    dayElem.append(dayTemp)
    days.append(dayElem)
    
    dayElem.addEventListener('click', handleDayClick)
    dayCount += 1

  }
}


export const displayData = (weeklyWeatherInfo, selectedInfoType) => {
  weeklyWeatherInfoData = weeklyWeatherInfo
  selectedDayCount = 0
  displayTopInfo(weeklyWeatherInfo[selectedDayCount])

  if (selectedInfoType === 'Temperature') {
    displayTempChart(weeklyWeatherInfo)
  } else {
    displayWindSpeedChart(weeklyWeatherInfo)
  }

  displayDaysTempInfo(weeklyWeatherInfo)
}
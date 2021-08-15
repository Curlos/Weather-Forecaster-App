export const convertFromKelvinToFahrenheit = (tempKelvin) => {
  return ((tempKelvin - 273.15) * 9/5) + 32
}

export const convertFromKelvinToCelsius = (tempKelvin) => {
  return tempKelvin - 273.15
}

export const convertFromCelsiusToFahrenheit = (tempCelsius) => {
  return (tempCelsius * 9/5) + 32
}

export const convertFromFahrenheitToCelsius = (tempFahrenheit) => {
  return (tempFahrenheit - 32) * 5/9
}
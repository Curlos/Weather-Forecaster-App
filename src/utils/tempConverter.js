export const convertFromKelvinToFarenheit = (tempKelvin) => {
  return ((tempKelvin - 273.15) * 9/5) + 32
}

export const convertFromKelvinToCelsius = (tempKelvin) => {
  return tempKelvin - 273.15
}
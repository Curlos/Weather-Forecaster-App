export const convertFromKelvinToFahrenheit = (tempKelvin) => ((tempKelvin - 273.15) * (9 / 5)) + 32;

export const convertFromKelvinToCelsius = (tempKelvin) => tempKelvin - 273.15;

export const convertFromCelsiusToFahrenheit = (tempCelsius) => (tempCelsius * (9 / 5)) + 32;

export const convertFromFahrenheitToCelsius = (tempFahrenheit) => ((tempFahrenheit - 32) * 5) / 9;

const GEOCODING_ACCESS_TOKEN = 'pk.eyJ1IjoiY3VybG9zIiwiYSI6ImNrczlyeHh1ZzA1dXgyem1wM3h0bDVmYzcifQ.EM7tOvoWVeGOkioR_vzybg'
const WEATHER_API_KEY = '592e70165bc276a3bc90133e13d7ad54'
const BASE_GEOCODING_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places`
const BASE_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/onecall`


export const getCoordsFromAPI = async (locationText) => {
    let API_URL = `${BASE_GEOCODING_API_URL}/${locationText}.json?access_token=${GEOCODING_ACCESS_TOKEN}`
    console.log(API_URL)
    let response = await fetch(API_URL)
    let data = await response.json()
    
    let longitude = data.features[0].center[0]
    let latitude = data.features[0].center[1]
    let locationName = data.features[0].place_name

    return [latitude, longitude, locationName]
}

export const getWeatherDataFromAPI = async (latitude, longitude) => {
    let API_URL = `${BASE_WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
    let response = await fetch(API_URL)
    let data = await response.json()

    return data.daily
}
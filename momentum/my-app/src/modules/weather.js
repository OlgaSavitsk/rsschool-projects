const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const error = document.querySelector('.weather-error')
const city = document.querySelector('.city')

async function getWeather(cityValue, lang) { 
    city.value = cityValue
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=${lang}&appid=bd09335c53afb6c7e669e2f8a2de2400&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    if(res.status === 400 || res.status === 404) {
        error.textContent = `Error! ${data.message} for ${city.value}!`
        weatherIcon.classList.remove()
        temperature.textContent = ''
        weatherDescription.textContent = ''
        wind.textContent = ''
        humidity.textContent = ''
    }
   
    weatherIcon.classList = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.floor(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)}m/s`
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
    error.textContent = ''

    if(lang === 'ru') {
        wind.textContent = `Cкорость ветра: ${Math.floor(data.wind.speed)}m/s`
        humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%` 
    }
}

export default getWeather
import * as getTime from  './modules/date-time.js';
import {setBg} from './modules/slider.js'
import getWeather from './modules/weather.js'
import {setQuotes, setQuotesTranslate} from './modules/quotes.js'
import setPlaylist from './modules/audio.js'
import {showGreeting} from './modules/greeting.js'
import {changeLang} from './modules/greeting.js'
import {setting, changeSettingLang} from './modules/settings.js';

const name = document.querySelector('.name')
const city = document.querySelector('.city')
const enBtns = document.querySelectorAll('.en')
const ruBtns = document.querySelectorAll('.ru')
let cityValueDefault = 'Minsk'
let lang = 'en'

getTime.showTime(lang)
showGreeting()
setBg()
getWeather(cityValueDefault, lang)
setQuotes(lang)
setPlaylist()
setting()

function setLocalStorage() {
    localStorage.setItem('name', name.value)
    localStorage.setItem('city', city.value)
}

async function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
     if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
        cityValueDefault = city.value
        await getWeather(city.value)
    } 
}

city.addEventListener('change', () => {
    getWeather(city.value)
})

enBtns.forEach(enBtn => {
    enBtn.addEventListener('click', (event) => {   
        changeLang('en')
        getWeather(city.value, 'en')
        getTime.showTime('en')
        setQuotesTranslate('en')
        changeSettingLang('en')
        event.target.classList.add('color')
        ruBtns.forEach(ruBtn => {
            ruBtn.classList.remove('color')
        })       
    })
})
ruBtns.forEach(ruBtn => {
    ruBtn.addEventListener('click', (event) => {
        changeLang('ru')
        getWeather(city.value, 'ru')
        getTime.showTime('ru')
        setQuotesTranslate('ru')
        changeSettingLang('ru')
        event.target.classList.add('color')
        enBtns.forEach(enBtn => {
            enBtn.classList.remove('color')
        })
    })
})

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

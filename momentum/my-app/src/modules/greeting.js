import greetingTranslation from './translate.js'

const gteetingText = document.querySelector('.greeting')
const name = document.querySelector('.name')
const enBtn = document.querySelector('.en')
const ruBtn = document.querySelector('.ru')

function getTimeOfDay() {
    const date = new Date()
    let currentTime = date.getHours()
    
    if(currentTime >= 6 && currentTime < 12) return 'morning';
    if(currentTime >= 12 && currentTime < 18) return 'afternoon';
    if(currentTime >= 18 && currentTime < 24) return 'evening';
    if(currentTime >= 0 && currentTime < 6) return 'night';
}

function showGreeting() {
    const timeOfDay = getTimeOfDay()
    const greeting = `Good ${timeOfDay},`
    gteetingText.textContent = greeting
}

function changeLang(lang) {
    const key = getTimeOfDay()
    gteetingText.innerHTML = greetingTranslation[key][lang]
    if(lang==='ru') {
        name.setAttribute('placeholder', '[Введите имя]')
    } else {
        name.setAttribute('placeholder', '[Enter name]')
    }
   
}

export {showGreeting, getTimeOfDay, changeLang}
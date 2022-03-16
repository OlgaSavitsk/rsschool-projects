//import {showGreeting} from './greeting.js'

const time = document.querySelector('#time')
const dateText = document.querySelector('.date')

export function showTime(lang) {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = `${currentTime}`
    setTimeout(() => {
        showTime()
        showDate(lang)
        //showGreeting(lang)
}, 1000)
}

export function showDate(lang) {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    if(lang ==='en') {
        const currentDate = date.toLocaleDateString('en-US', options);
        dateText.textContent = `${currentDate}`
    }
    if(lang ==='ru') {
        const currentDate = date.toLocaleDateString('ru-RU', options);
        dateText.textContent = `${currentDate}`
    }  
   
}

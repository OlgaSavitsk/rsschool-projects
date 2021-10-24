import settingTranslation from './setting-translate.js'
import {setSettingPage} from './slider.js'

const settingViews = document.querySelectorAll('.setting-view')
const settingContainer = document.querySelector('.setting-modal')
const toggleBtn = document.querySelector('.toggle')
const backgroundBtn = document.querySelectorAll('.background-btn')
const translateBtns = document.querySelectorAll('.translate-btn')
const hideContainer = document.querySelector('.hide')

function setting() {
    document.querySelectorAll('.nav-list li').forEach((item, index) => {
    
        item.onmouseenter = () => {
            settingViews[index].style.display = 'block'
            if(index > 0 && index < 2) {
                settingViews[index].previousElementSibling.style.display = 'none'
                settingViews[index].nextElementSibling.style.display = 'none'
            }
            if(index === 0) {
                settingViews[index].nextElementSibling.style.display = 'none' 
            }
            if(index === settingViews.length - 1) {
                settingViews[index].previousElementSibling.style.display = 'none'
                settingViews[0].style.display = 'none' 
            }
        }   
    })
}

function changeSettingLang(lang) {
for(let key in settingTranslation) {
    document.querySelector(`.lng-${key}`).textContent = settingTranslation[key][lang]
    }
}

function hiddenBlock(event) {
   
    const blocks = ['time', 'date', 'greeting', 'quote', 'weather', 'player', 'links']
    for(let block of blocks) {
        if(hidden && event.target === document.querySelector(`.background-btn.lng-${block}`)) {
            document.querySelector(`.${block}`).classList.add('hidden-block') 
            console.log(block)
           // hidden = true
            return block
        } 
       if(!hidden && event.target === document.querySelector(`.background-btn.lng-${block}`)) {    
        document.querySelector(`.${block}`).classList.remove('hidden-block')
        }
        
    }
}

function setLocalStorageSetting() {
    translateBtns.forEach(translateBtn => {
        if(translateBtn.classList.contains('color')) {
            const lang = translateBtn.textContent
            return lang
        }
    })
    const state = {
        language: lang,
        photoSource: setSettingPage(),
        blocks: hiddenBlock()
    }
    
    localStorage.setItem('state', state)
}

async function getLocalStorageSetting() {
     if(localStorage.getItem('state')) {
        settingState = localStorage.getItem('state')
        lang = state.language
        await getWeather(city.value)
    } 
}

let toggle = false
let hidden = false

toggleBtn.addEventListener('click', () => {
    toggle = !toggle 
    if(toggle === true) {
        settingContainer.style.display = 'block'
    }      
    if(toggle === false) {
        settingContainer.style.display = 'none' 
    }
})

backgroundBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        toggle = !toggle 
        settingContainer.style.display = 'none'
    })
})

backgroundBtn.forEach(btn => {   
    btn.addEventListener('click', (event) => {
     hidden = !hidden
        hiddenBlock(event)  
})
})

export {setting, changeSettingLang}

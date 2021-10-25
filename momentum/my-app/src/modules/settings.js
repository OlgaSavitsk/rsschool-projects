import settingTranslation from './setting-translate.js'

const settingViews = document.querySelectorAll('.setting-view')
const settingContainer = document.querySelector('.setting-modal')
const toggleBtn = document.querySelector('.toggle')
const backgroundContainer = document.querySelector('.background')
const backgroundBtn = document.querySelectorAll('.background-btn')
const hiddenBlocks = document.querySelectorAll('.show')

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
    const blocks = ['time', 'date', 'greeting', 'quotes', 'weather', 'player', 'links']
    let blocksValue = []
    for(let block of blocks) {
        if(event.target === document.querySelector(`.background-btn.lng-${block}`)) {
            document.querySelector(`.${block}`).classList.toggle('show') 
            document.querySelector(`.background-btn.lng-${block}`).classList.toggle('colorset')
        } 
    }
    for(let hiddenBlock of hiddenBlocks) {
        if(!hiddenBlock.classList.contains('show')) {         
            blocksValue.push(hiddenBlock.classList.value)
        }
    }
     return blocksValue
}

let toggle = false

toggleBtn.addEventListener('click', () => {
    toggle = !toggle 
    if(toggle === true) {
        settingContainer.style.display = 'block'
    }      
    if(toggle === false) {
        settingContainer.style.display = 'none' 
    }
})

backgroundContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('background-btn')) {
        for(let btn of backgroundBtn) {
            btn.classList.remove('colorset')
        }
        event.target.classList.add('colorset')
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
        hiddenBlock(event)  
    })
})

export {setting, changeSettingLang, hiddenBlock}

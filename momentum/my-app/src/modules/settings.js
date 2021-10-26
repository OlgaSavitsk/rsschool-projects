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
                settingViews[settingViews.length - 1].style.display = 'none'
            }
            if(index === settingViews.length - 1) {
                settingViews[index].previousElementSibling.style.display = 'none'
                settingViews[0].style.display = 'none' 
            }
        }   
    })
}

function changeSettingLang(lng) {
    for(let key in settingTranslation) {
        console.log(document.querySelector(`.lng-${key}`))
        document.querySelector(`.lng-${key}`).textContent = settingTranslation[key][lng]
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

/* toggleBtn.addEventListener('click', () => {
    toggle = !toggle 
    if(toggle === true) {
        settingContainer.style.display = 'block'
    }      
    if(toggle === false) {
        settingContainer.style.display = 'none' 
    }
})   */

document.addEventListener('click', (event) => {
    
   const classlist = ['background-btn', 'nav-link', 'setting-modal']
console.log(event.target)
        
         if(event.target !== document.querySelector('.setting-view-container') && 
         event.target !== document.querySelector('.toggle')) {
            //settingContainer.classList.remove('visibled')
            settingContainer.classList.add('visibled')
           
        } 

        if(event.target === document.querySelector('.toggle')) {
            settingContainer.classList.toggle('visibled')
            
        }
        
        for(let i = 0; i < classlist.length; i++) {
            if(event.target.classList.contains(classlist[i])) {
                settingContainer.classList.remove('visibled') 
            }
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

/* backgroundBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        toggle = !toggle 
        settingContainer.style.display = 'none'    
    }) 
}) */

backgroundBtn.forEach(btn => {   
    btn.addEventListener('click', (event) => {
        hiddenBlock(event)  
    })
}) 

export {setting, changeSettingLang, hiddenBlock}

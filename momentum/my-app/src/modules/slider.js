import {getTimeOfDay} from './greeting.js'

const body = document.querySelector('.body')
const nextBtn = document.querySelector('.slide-next')
const prevBtn = document.querySelector('.slide-prev')
const unsplashBtn = document.querySelector('.unsplash')
const githubhBtn = document.querySelector('.github')
const flickrBtn = document.querySelector('.flickr')

let randomNum
let indexFlickr
let toggleImage = false
let toggleImageFlickr = false
let toggleImageUnsplash = false

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
}

async function styleBg(number) {
    const img = new Image();  
    const timeOfDay = getTimeOfDay()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${number}.jpg` 
    img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`; 
    } 
}

function setBg() {
    toggleImage = !toggleImage
    const bgNum = getRandomNum(1, 20).toString().padStart(2, '0')
    styleBg(bgNum)
}

function getSlideNext() {
    randomNum++
    if(randomNum > 20) {
        randomNum = 1
    } 
    styleBg(randomNum.toString().padStart(2, '0'))
}

async function getFlickrNext() {
    console.log(toggleImageFlickr)
    indexFlickr++
    await getLinksToImageFlickr(indexFlickr)
}

function getSlidePrev() {
    randomNum--
    if(randomNum < 1) {
        randomNum = 20
    }
    styleBg(randomNum.toString().padStart(2, '0'))
}

async function getFlickrPrev() {
    console.log(toggleImageFlickr)
    indexFlickr--
    if(indexFlickr < 1) {
        indexFlickr = 99
    }
    await getLinksToImageFlickr(indexFlickr)
}

async function getLinksToImage() {
    const img = new Image(); 
    const timeOfDay = getTimeOfDay()
    const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=C1S6YCrZfOiSdwG0MkvilXFoSA07PbXGVKkVLNfAb6E`
    const res = await fetch(url)
    const data = await res.json()
    img.src = data.urls.regular
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`; 
        }
}

async function getLinksToImageFlickr(number) {
    const img = new Image(); 
    const timeOfDay = getTimeOfDay()
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f796ef77418cdd74e342ac3a1892461f&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url)
    const data = await res.json()
    for(let number = 0; number < data.photos.photo.length; number++) {
        img.src = data.photos.photo[number].url_l
    }
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`; 
    }
}

function setSettingPage() {
    if(toggleImage === true) return 'github'
    if(toggleImageUnsplash === true) return 'unsplash'
    if(toggleImageFlickr === true) return 'flickr'
}

githubhBtn.addEventListener('click', () => {
    setBg()
    toggleImage = true
    toggleImageFlickr = false
    toggleImageUnsplash = false
})

unsplashBtn.addEventListener('click', () => {
     getLinksToImage()
     toggleImageUnsplash = true
     toggleImageFlickr = false
     toggleImage = false
})

flickrBtn.addEventListener('click', () => {
    getLinksToImageFlickr(0)
    toggleImageFlickr = !toggleImageFlickr
    toggleImage = false
    toggleImageUnsplash = false
})

nextBtn.addEventListener('click', () => {

    if(toggleImageFlickr === true) {
        getFlickrNext()
    }
    if(toggleImage === true) {
        getSlideNext()
    } 
    if(toggleImageUnsplash === true) {
        getLinksToImage()
    }
  
})
prevBtn.addEventListener('click', () => {
    if(toggleImageFlickr === true) {
        getFlickrPrev()
    }
    if(toggleImage === true) {
        getSlidePrev()
    } 
    if(toggleImageUnsplash === true) {
        getLinksToImage()
    }
})

export {setBg, styleBg, setSettingPage}

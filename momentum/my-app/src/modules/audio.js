import playList from './playlist.js'

const playBtn = document.querySelector('.play')
const nextBtn = document.querySelector('.play-next')
const prevBtn = document.querySelector('.play-prev')
const playlistContainer = document.querySelector('.play-list')
const playerTimer = document.querySelector('.player-timer')
let isPlay = false
let playNum = 0

const audio = new Audio()

function playAudio() {
    audio.src = playList[playNum].src
    audio.currentTime = 0   
    audio.setAttribute('autoplay', 'autoplay')  
    isPlay = !isPlay 
    if(!isPlay) {
        audio.pause()
        isPlay = false
        playBtn.classList.remove('pause')
    } else {
        audio.play()
        playBtn.classList.add('pause')
        toggleItem()
    }
}

function playNext() {
    playNum++
    if(playNum === playList.length) {
        playNum = 0
    }
    audio.src = playList[playNum].src
    audio.play()
    toggleItem()
}

function playPrev() {
    if(playNum === 0) {
        playNum = playList.length
    }
    playNum--
    audio.src = playList[playNum].src
    audio.play()
    toggleItem()
}

function setPlaylist() {  
    for(let item of playList) {
        const li = document.createElement('li')
        li.classList.add('play-item')
        li.textContent = `${item.title}`
        playlistContainer.append(li)      
    } 
}

function toggleItem() { 
    document.querySelectorAll('.play-item').forEach(element => {
        if(playList[playNum].title === element.textContent) {
            element.classList.add('item-active') 
        } else {
            element.classList.remove('item-active') 
        }
    }); 
    playerTitle.textContent = `${playList[playNum].title}` 
}

const progress = document.querySelector('.progress');
const progressVol = document.querySelector('.progress-volume');
const volume = document.querySelector('.progress-volume')
const volumeMute = document.querySelector('.mute')
const volumeIcon = document.querySelector('.volume-icon')
const playerTitle = document.querySelector('.player-title')


   
function handleRange() {
    progressVol.addEventListener('input', function() {
        audio.volume = this.value
        const value = this.value * 100;
        this.style.background = `linear-gradient(to right, #AE25DE 0%, #AE25DE ${value}%, #fff ${value}%, white 100%)`
        if(value === 0) {
            volumeMute.style.display = 'block'
            volumeIcon.style.display = 'none'
        } else {
           volumeMute.style.display = 'none'
           volumeIcon.style.display = 'block'
        }    
    }) 
}

function formatTime(time) {
    let minutes = Math.floor(time / 60)
    let timeForSecond = time - (minutes * 60)
    let seconds = Math.floor(timeForSecond)
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${secondsReadable}`
}

function handleProgress() {
    const percent = (audio.currentTime / audio.duration) * 100
    progress.value = percent
    progress.style.background = `linear-gradient(to right, #AE25DE 0%, #AE25DE ${percent}%, #fff ${percent}%, white 100%)`;
    playerTimer.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration)
}

   function scrub(e) {
       const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
       audio.currentTime = scrubTime
   }

   volume.addEventListener('change', handleRange)
   volume.addEventListener('mousemove', handleRange)
   let isMute = false
   volumeIcon.addEventListener('click', function() {     
       audio.volume = 0
       volumeMute.style.display = 'block'
       volumeIcon.style.display = 'none'
       isMute = !isMute
       })
   volumeMute.addEventListener('click', function() {
       isMute = isMute
       audio.volume = volume.value
       volumeMute.style.display = 'none'
       volumeIcon.style.display = 'block'
   })
   audio.addEventListener('timeupdate', handleProgress)
   audio.addEventListener('ended', function () {
       audio.currentTime = 0;
   }, false);
   
   let mousedown = false;
   progress.addEventListener('click', scrub)
   progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
   progress.addEventListener('mousedown', () => mousedown = true)
   progress.addEventListener('mouseup', () => mousedown = false)   
  
playBtn.addEventListener('click', playAudio)
nextBtn.addEventListener('click', playNext)
prevBtn.addEventListener('click', playPrev)
audio.addEventListener('ended', playNext)

export default setPlaylist
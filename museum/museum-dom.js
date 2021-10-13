const items = document.querySelectorAll('.project-image')
const dots = document.querySelectorAll('.dots-slide-welcome')
const dotsContainer = document.querySelector('.dots-container')
const slideNumber = document.querySelector('.dots-text')

let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('active', direction)
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('next', direction)
        this.classList.add('active')
        isEnabled = true;
    })
}

function previouseItem(n) {
    hideItem('to-right');
    changeCurrentItem(n-1);
    showItem('from-left')
}

document.querySelector('.dots_button-welcome.left').addEventListener('click', function() {
    if(isEnabled){
        previouseItem(currentItem)
        slideNumber.innerHTML = `0${currentItem + 1} / 05`;
        dots[currentItem].classList.toggle('active-dot')      
        if(currentItem === dots.length-1) {
            dots[0].classList.remove('active-dot')
        }
    }
    dots[currentItem + 1].classList.remove('active-dot')
})

function nextItem(n) {
    hideItem('to-left')
    changeCurrentItem(n + 1)
    showItem('from-right')
    }
    
    document.querySelector('.dots_button-welcome.right').addEventListener('click', function() {
        if(isEnabled){
            nextItem(currentItem)
            slideNumber.innerHTML = `0${currentItem + 1} / 05`;
            dots[currentItem].classList.toggle('active-dot')      
            if(currentItem === 0) {
                dots[dots.length-1].classList.remove('active-dot')
            }
        }
        dots[currentItem - 1].classList.remove('active-dot')
    });

dotsContainer.addEventListener('mousedown', function(event) {
   if(event.target.className != 'dots-slide-welcome') return 
    dots.forEach((dot, index) => {
            dot.classList.remove('active-dot')
            dot.addEventListener('click', () => {
                slideNumber.innerHTML = `0${index+1} / 05`;
                if(isEnabled){
                    hideItem('to-left')
                    changeCurrentItem(index)
                    showItem('from-right')             
                }  
            })                    
        }) 
    event.target.classList.add('active-dot');
}) 

const swipedetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let threshold = 100;
    let restrain = 750;
    let startTime = 0;
    let elapsedTime = 0;
    let allowedTime = 300;
    
    surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault()
    })
    
    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if(elapsedTime <= allowedTime) {
            if(Math.abs(distX) > threshold && Math.abs(distY) <= restrain) {
                if(distX > 0) {
                    if(isEnabled) {
                        previouseItem(currentItem);
                        slideNumber.innerHTML = `0${currentItem+1} / 05`;
                    }
                } else {
                    if(isEnabled) {
                        nextItem(currentItem)
                        slideNumber.innerHTML = `0${currentItem+1} / 05`;
                    }
                }
            }
        }
        e.preventDefault()
        })
    }
    var el = document.querySelector('.carousel')
    swipedetect(el)


const overlays = document.querySelectorAll('.overlay')
let videoItems = document.querySelectorAll('.video-slide')
const videoDots = document.querySelectorAll('.dots-slide')
const videoDotsContainer = document.querySelector('.dots-video-container')
const carousel = document.querySelector('.video-slider')
const slider = document.querySelector('.slider')
const progressRate = document.querySelector('.progress')

const mainCam = document.querySelector('.main-iframe');
const mainContainer = document.querySelector('.main-video')
let gap = 42
let index = 1;

const firstClone = videoItems[0].cloneNode(true)
const lastClone = videoItems[videoItems.length - 1].cloneNode(true)

firstClone.id = 'first-clone';
lastClone.id = 'last-clone'
slider.append(firstClone)
slider.prepend(lastClone)

const slideWidth = videoItems[index].clientWidth + gap;

slider.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
    videoItems = document.querySelectorAll('.video-slide')
    if(index >= videoItems.length - 1) return
    index++
    slider.style.transform = `translateX(${-slideWidth * index}px)`
    slider.style.transition = '.7s'   
}

const previouseSlide = () => {
    videoItems = document.querySelectorAll('.video-slide')
    if(index <= 0) return
    index--
    slider.style.transform = `translateX(${-slideWidth * index}px)`
    slider.style.transition = '.7s' 
}

function toggleMainVideo(index) {
    const video = videoItems[index].children[0].getAttribute('data-src');
    const poster = videoItems[index].children[0].getAttribute('poster');
   mainCam.src = video; 
   mainCam.poster = poster; 
}

document.querySelector('.dots_button.rigth').addEventListener('click', function() {
        startSlide()  
        onPauseVideo()
        toggle.textContent = '\u23F5'
        playButton.style.display = 'block'
        progressRate.carrentTime = 0
        progressRate.setAttribute('value', '1')  
            slider.addEventListener('transitionend', () => {
                videoItems = document.querySelectorAll('.video-slide')
                 if(videoItems[index].nextElementSibling.id === firstClone.id) {
                     slider.style.transition = 'none';
                    index = 0                  
                     slider.style.transform = `translateX(${0 * index}px)`
                 }
             })  
             toggleMainVideo(index)
});

document.querySelector('.dots_button.left').addEventListener('click', function() {
    previouseSlide()  
    onPauseVideo()
    toggle.textContent = '\u23F5'
    playButton.style.display = 'block'      
        slider.addEventListener('transitionend', () => {
            videoItems = document.querySelectorAll('.video-slide')
             if(videoItems[index].id === lastClone.id) {
                 slider.style.transition = 'none';
                index = 5                  
                 slider.style.transform = `translateX(${-2470}px)`
             }
         }) 
         toggleMainVideo(index)  
});

slider.addEventListener('transitionend', () => {
    videoItems = document.querySelectorAll('.video-slide')
     if(videoItems[index].id === firstClone.id) {
         slider.style.transition = 'none';
        index = 0                  
         slider.style.transform = `translateX(${0 * index}px)`
     }
})

videoDotsContainer.addEventListener('mousedown', function(event) {
    if(event.target.className != 'dots-slide') return 
    videoDots.forEach((dot, index) => {
             dot.classList.remove('active-video')
             onPauseVideo()
             playButton.style.display = 'block'
             progressRate.value = 0
             dot.addEventListener('click', () => {
                videoItems = document.querySelectorAll('.video-slide')
                if(index >= videoItems.length - 1) return
                index++
                slider.style.transform = `translateX(${-slideWidth * index}px)`
                slider.style.transition = '.7s' 
                slider.addEventListener('transitionend', () => {
                    videoItems = document.querySelectorAll('.video-slide')
                     if(videoItems[index].nextElementSibling.id === firstClone.id) {
                         slider.style.transition = 'none';
                        index = 0                  
                         slider.style.transform = `translateX(${0 * index}px)`
                     }
                })  
                toggleMainVideo(index)
            })                    
    })  
     event.target.classList.add('active-video');   
 }) 

 overlays.forEach(item => {    
    item.addEventListener('click', function(event) {   
        onPauseVideo() 
        console.log(event.target)
        event.target.previousElementSibling.contentWindow.postMessage('{"event": "command", "func": "playVideo", "args": ""}','*')
        event.target.classList.add('unvisible')  
        //event.target.focus()                   
    })   
})

function onPauseVideo() {
    overlays.forEach(item => {
        item.classList.remove('unvisible') 
        item.previousElementSibling.contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}','*')  
    })
}  
 
 const player = document.querySelector('.video')
 const mainPlayer = document.querySelector('.main-video')
 const toggle = document.querySelector('.toggle')
 const volume = player.querySelector('.progress-volume')
 const volumeMute = player.querySelector('.mute')
 const volumeIcon = player.querySelector('.volume-icon')
 const playButton = document.querySelector('.playButton')
 const flSc = document.querySelector('.fullscreen')
 const progressBar = document.querySelector('.progress-bar')
 const progressContainer = document.querySelector('.progress-bar_container')
 const speedTooltip = document.querySelector('.tooltip')

 function togglePlay() {
     if(mainCam.paused) {
         'play';
         playButton.style.display = 'none'
     } 
     else {
         'pause'
         playButton.style.display = 'block'
     }
 }

 function playVideo() {
    if(mainCam.paused) {
        mainCam.play()
          'play';
          playButton.style.display = 'none'
      } 
      else {
        mainCam.pause()
          'pause'
          playButton.style.display = 'block'
      }
 }

 function toggleButton() {
     const icon = this.paused ? '\u23F5' : '\u23F8' 
     toggle.textContent = icon
 }

 function handleRange() {
     mainCam.volume = this.value
     value = this.value * 100
     volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
     if(value === 0) {
         volumeMute.style.display = 'block'
         volumeIcon.style.display = 'none'
     } else {
        volumeMute.style.display = 'none'
        volumeIcon.style.display = 'block'
     }
 }

 function handleProgress() {
     const percent = (mainCam.currentTime / mainCam.duration) * 100
     progressRate.value = percent
     progressRate.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #fff ${percent}%, white 100%)`;
     if(percent === 100) {
        playButton.style.display = 'block'
     }
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progressRate.offsetWidth) * mainCam.duration;
        mainCam.currentTime = scrubTime
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            player.requestFullscreen();
            mainCam.classList.add('scale')
            progressContainer.classList.add('fixed')
        } else {
            document.exitFullscreen();
            mainCam.classList.remove('scale');
            progressContainer.classList.remove('fixed')
        }
      }
      
flSc.addEventListener('mousedown', toggleFullScreen)

mainCam.addEventListener('click', togglePlay)
mainCam.addEventListener('click', playVideo)
mainCam.addEventListener('play', toggleButton)
mainCam.addEventListener('pause', toggleButton)

toggle.addEventListener('click', playVideo)

playButton.addEventListener('click', playVideo)
volume.addEventListener('change', handleRange)
volume.addEventListener('mousemove', handleRange)
let isMute = false
volumeIcon.addEventListener('click', function() {     
    mainCam.volume = 0
    volumeMute.style.display = 'block'
    volumeIcon.style.display = 'none'
    isMute = !isMute
    })
volumeMute.addEventListener('click', function() {
    isMute = isMute
    mainCam.volume = volume.value
    volumeMute.style.display = 'none'
    volumeIcon.style.display = 'block'
})
mainCam.addEventListener('timeupdate', handleProgress)
mainCam.addEventListener('ended', function () {
    mainCam.currentTime = 0;
}, false);

let mousedown = false;
progressRate.addEventListener('click', scrub)
progressRate.addEventListener('mousemove', (e) => mousedown && scrub(e))
progressRate.addEventListener('mousedown', () => mousedown = true)
progressRate.addEventListener('mouseup', () => mousedown = false)

let downKeys = {};
document.addEventListener('keydown', function(e) {
    if(e.keyCode === 77) {   
    mainCam.volume = 0
    volumeMute.style.display = 'block'
    volumeIcon.style.display = 'none'
    isMute = !isMute
    }
    if(e.keyCode === 77 && !isMute) {
        isMute = isMute
        mainCam.volume = volume.value
        volumeMute.style.display = 'none'
        volumeIcon.style.display = 'block'
    }
    if(e.keyCode === 32) {   
        mainCam.pause()
        isMute = !isMute
        }
        if(e.keyCode === 32 && !isMute) {   
            mainCam.play()
            isMute = isMute
            }
    if(e.keyCode === 70) {   
        toggleFullScreen()
    }
    downKeys[e.keyCode] = true
    if(downKeys[16] && downKeys[188]) {
        if(mainCam.playbackRate === 2) {
            mainCam.playbackRate = 2
        } else {
            mainCam.playbackRate += 0.25
            speedTooltip.style.display = 'block'
            speedTooltip.innerHTML = `x${mainCam.playbackRate}`
        }       
    }   
    if(downKeys[16] && downKeys[190]) {
        if(mainCam.playbackRate === 0.25) {
            mainCam.playbackRate = 0.25
        } else {
        mainCam.playbackRate -= 0.25
        speedTooltip.style.display = 'block'
        speedTooltip.innerHTML = `x${mainCam.playbackRate}`
        }     
    }  
})

document.addEventListener('keyup', event => {
    downKeys[event.keyCode] = false;
    setTimeout(() => {
        speedTooltip.style.display = 'none'
    }, 1000)
   
});

document.querySelector('.range-input').addEventListener('input', function() {
    document.querySelector('.original-image').style.width = this.value + "%";
})
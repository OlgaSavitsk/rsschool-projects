const items = document.querySelectorAll('.project-image')
const dots = document.querySelectorAll('.dots-slide-welcome')
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
    }
})

function nextItem(n) {
    hideItem('to-left')
    changeCurrentItem(n + 1)
    showItem('from-right')
    }
    
    document.querySelector('.dots_button-welcome.right').addEventListener('click', function() {
        if(isEnabled){
            nextItem(currentItem)
        }
    });

dots.forEach((dot, index) => {
    
    dot.addEventListener('click', function() {
        slideNumber.innerHTML = `0${index+1} / 05`;
        this.classList.add('active-dot')
        console.log(index)
        if(isEnabled){
            nextItem(index)
        }  
        this.previousElementSibling.classList.remove('active-dot')
       /*  if(index === 0) {
            this.classList.add('active-dot')
        }  */ 
       
    }) 
})


const swipedetect = (el) => {
let surface = el;
let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;
let threshold = 100;
let restrain = 100;
let startTime = 0;
let elapsedTime = 0;
let allowedTime = 300;

surface.addEventListener('mousedown', function(e) {
    console.log('ok')
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
                }
            } else {
                if(isEnabled) {
                    nextItem(currentItem)
                }
            }
        }
    }
    e.preventDefault()
    })
}
var el = document.querySelector('.carousel')
swipedetect(el)
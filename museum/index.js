const progress = document.querySelector('.progress');
const progressVol = document.querySelector('.progress-volume');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const count = document.querySelector('.number');
const minusSenior = document.querySelector('.seniorMinus');
const plusSenior = document.querySelector('.seniorPlus');
const countSenior = document.querySelector('.seniorInput');
const button = document.querySelector('.tickets__button');
const modal = document.querySelector('.tickets-modal');
const opacity = document.querySelector('.cover');
const closeBtn = document.querySelector('.close');

  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
})

  
progressVol.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
})

plus.addEventListener('click', function() {
  count.value ++;
  if(count.value > 19) {
    count.value = 20
  } 
})

minus.addEventListener('click', function() {
  count.value --;
  if(count.value < 1) {
    count.value = 0
  }  
})

plusSenior.addEventListener('click', function() {
  countSenior.value ++;
  if(countSenior.value > 19) {
    countSenior.value = 20
  } 
})

minusSenior.addEventListener('click', function() {
  countSenior.value --;
  if(countSenior.value < 1) {
    countSenior.value = 0
  } 
})

button.addEventListener('click', function() {
  modal.classList.add('move');
  opacity.classList.add('visible')
});

closeBtn.addEventListener('click', function() {
  modal.classList.remove('move');
  opacity.classList.remove('visible')
});

opacity.addEventListener('click', function() {
  modal.classList.remove('move');
  opacity.classList.remove('visible')
});

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
const screenWidth = window.screen.width;
const images = document.querySelectorAll('.carousel .slides-container img')
const slidesContainer = document.querySelector('.slides-container')

let width;
  
/* progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  if(screenWidth <= 768) {
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  }
}) */

  
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


/* function init() {
  width = document.querySelector('.carousel').offsetWidth;
  slidesContainer.style.width = width * images.length + 'px';
  images.forEach(image => {
    image.style.width = width + 'px';
    image.style.height = 'auto';
  })
}

window.addEventListener('resize', init()) */

/* console.log(`143 балл
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) Форма покупки билетов 
3) при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается 
4) Результат проверки скорости сайта для мобильных устройств: 0 to 49 (red): Poor - не выполнено 0 ,баллов; 50 to 89 (orange): Needs Improvement - частично выполнено - 4 баллов; 90 to 100 (green): Good - выполнено полностью - 8 баллов 

Частично выполненные пункты:
1) вёрстка меню соответствует макету на всех проверяемых разрешениях 

Выполненные пункты:
1) Блок header 
2) Секция Welcome 
3) Секция Visiting 
4) Секция Explore 
5) Секция Video 
6) Секция Gallery 
7) Секция Tickets 
8) Форма покупки билетов 
9) Секция Contacts 
10) Блок footer  
11) Блок header 
12) Секция Welcome 
13) Секция Visiting 
14) Секция Explore 
15) Секция Video 
16) Секция Gallery 
17) Секция Tickets 
18) Форма покупки билетов 
19) Секция Contacts 
20) Блок footer  
21) Блок header 
22) Секция Welcome 
23) Секция Visiting 
24) Секция Explore 
25) Секция Video 
26) Секция Gallery 
27) Секция Tickets 
28) Секция Contacts 
29) Блок footer  
30) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки,  элементы не должны скрываться, обрезаться, наезжать друг на друга, если это не предусмотрено макетом. 
31) слайдера в секции Welcome
32) слайдера сравнения изображений в секции Explore
33) кастомного видеоплеера в секции Video
34) слайдера в секции Video
35) YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого 
36) карты 
37) при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку 
38) ссылки в меню работают, обеспечивая плавную прокрутку по якорям`) */
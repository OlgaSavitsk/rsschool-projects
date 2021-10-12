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
const totalText = document.querySelector('.total')
const radio = document.getElementsByName('radio')


let width;
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  if(screenWidth <= 768) {
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  }
}) 
 
progressVol.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
}) 

function totalCount(countValue, countValueSeniore) {
  let total = []
  let value
  for(let i = 0; i<radio.length; i++) {
    if(radio[i].checked) {
      console.log(radio[i].checked)
      value = radio[i].value 
    }  
}
  let totalSumBasic = (value * countValue) + (value * countValueSeniore)
  let totalSumSenior = value * countValueSeniore
  total.push(totalSumBasic, totalSumSenior)
  console.log(total)
  totalSum = total.reduce(function(a, b) {
    return a + b
  })
  console.log(totalSum)
  totalText.innerHTML = `Total €${totalSum}`
}

document.addEventListener("DOMContentLoaded", () => {
  radio.forEach(item => {
    let totalSum = (item.value/2 * 1) + (item.value/2 * 1)
    totalText.innerHTML = `Total €${totalSum}`
    item.addEventListener('input', () => {
     totalCount(1, 1)
    })   
  }) 
}); 

plus.addEventListener('click', function() {
  count.value ++;
  totalCount(count.value, 0)
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
  totalCount(0, countSenior.value)
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

console.log(`
Ваша оценка - 99 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

2) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них 

3) когда пользователь выбирает дату в форме слева, она отображается в билете справа 

4) нельзя выбрать дату в прошлом 

5) когда пользователь выбирает время в форме слева, оно отображается в билете справа 

6) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут 

7) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа 

8) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа 

9) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы 

10) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв 

11) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр 

12) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" 

13) в секции Contacts добавлена интерактивная карта 

14) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету 

15) стиль карты соответствует макету 

16) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера 

Частично выполненные пункты:
1) перелистывание слайдов бесконечное (зацикленное) 

2) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

3) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные 

4) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

5) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

Выполненные пункты:
1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

4) слайды перелистываются плавно с анимацией смещения вправо или влево 

5) перелистывание слайдов бесконечное (зацикленное) 

6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

10) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

11) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

12) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

13) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

14) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

15) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

16) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

17) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

18) прогресс-бар отображает прогресс проигрывания видео 

19) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

20) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

21) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

22) при перемещении ползунка громкости звука изменяется громкость видео 

23) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

24) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

25) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

26) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

27) клавиша Пробел — пауза, при повторном нажатии - play 

28) Клавиша M (англ) — отключение/включение звука 

29) Клавиша F — включение/выключение полноэкранного режима 

30) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

31) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

32) ползунок можно перетягивать мышкой по горизонтали 

33) ползунок никогда не выходит за границы картины 

34) при перемещении ползунка справа налево плавно появляется нижняя картина 

35) при перемещении ползунка слева направо плавно появляется верхняя картина 

36) при обновлении страницы ползунок возвращается в исходное положение 

37) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

38) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

39) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

`)

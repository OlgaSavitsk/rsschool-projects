import * as getTime from  './modules/date-time.js';
import {setBg, setSettingPage, getLinksToImage, getLinksToImageFlickr} from './modules/slider.js'
import getWeather from './modules/weather.js'
import {setQuotes, setQuotesTranslate} from './modules/quotes.js'
import setPlaylist from './modules/audio.js'
import {showGreeting} from './modules/greeting.js'
import {changeLang} from './modules/greeting.js'
import {setting, changeSettingLang, hiddenBlock} from './modules/settings.js';

const name = document.querySelector('.name')
const city = document.querySelector('.city')
const enBtns = document.querySelectorAll('.en')
const ruBtns = document.querySelectorAll('.ru')
const activeLangBtn = document.querySelectorAll('.color')
const translateBtns = document.querySelectorAll('.translate-btn')
const unsplashBtn = document.querySelector('.unsplash')
const githubhBtn = document.querySelector('.github')
const flickrBtn = document.querySelector('.flickr')

let cityValueDefault = 'Minsk'
let lang = 'en'

getTime.showTime(lang)
showGreeting()
setBg()
getWeather(cityValueDefault, lang)
setQuotes(lang)
setPlaylist()
setting()


function setLocalStorage() {
    localStorage.setItem('name', name.value)
    localStorage.setItem('city', city.value)
}

async function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
     if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
        await getWeather(city.value)
    } 
}

function setLocalStorageSetting(event) {
    translateBtns.forEach(translateBtn => {
        if(translateBtn.classList.contains('color')) {
            lang = translateBtn.textContent
            return lang
        }
    })   
    const state = {
        language: lang,
        photoSource: setSettingPage(),
        blocks: hiddenBlock(event)
    }  
    window.localStorage.setItem('state', JSON.stringify(state))   
}

async function getLocalStorageSetting() {
     if(localStorage.getItem('state')) {
        let settingState = JSON.parse(localStorage.getItem('state'))
        lang = settingState.language
        changeLang(lang)
        getWeather(city.value, lang)
        getTime.showTime(lang)
        await setQuotesTranslate(lang)
        changeSettingLang(lang)
        
        if(document.querySelectorAll(`.${lang}`)) {
            if(document.querySelector(`.color`)) {
                document.querySelector(`.color`).classList.remove('color')
            }
        document.querySelector(`.${lang}`).classList.add('color')          
        } 
        if(settingState.photoSource === 'github') {
            setBg()
            githubhBtn.classList.add('colorset')
        }
        if(settingState.photoSource === 'unsplash') {
            getLinksToImage()
            unsplashBtn.classList.add('colorset')
        }
        if(settingState.photoSource === 'flickr') {
            getLinksToImageFlickr(0)
            flickrBtn.classList.add('colorset')
        }
        let blocksValue = settingState.blocks
        for(let val of blocksValue) {
            if(document.querySelector(`.background-btn.lng-${val}`)) {
                document.querySelector(`.${val}`).classList.toggle('show') 
                document.querySelector(`.background-btn.lng-${val}`).classList.toggle('colorset')
            }
        }
         
    } 
}

city.addEventListener('change', () => {
    getWeather(city.value)
})

enBtns.forEach(enBtn => {
    enBtn.addEventListener('click', (event) => { 
        changeLang('en')
        getWeather(city.value, 'en')
        getTime.showTime('en')
        setQuotesTranslate('en')
        changeSettingLang('en')
        event.target.classList.add('color')
        enBtns.forEach(enBtn => {
            enBtn.classList.add('color')
        })
        ruBtns.forEach(ruBtn => {
            ruBtn.classList.remove('color')
        })       
    })
})
ruBtns.forEach(ruBtn => {
    ruBtn.addEventListener('click', (event) => {
        changeLang('ru')
        getWeather(city.value, 'ru')
        getTime.showTime('ru')
        setQuotesTranslate('ru')
        changeSettingLang('ru')
        event.target.classList.add('color')
        ruBtns.forEach(ruBtn => {
            ruBtn.classList.add('color')
        })
        enBtns.forEach(enBtn => {
            enBtn.classList.remove('color')
        })
    })
})

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

window.addEventListener('beforeunload', setLocalStorageSetting)
window.addEventListener('load', getLocalStorageSetting)

console.log(`Ваша оценка - 145.5 балла 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото 

2) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным 

Частично выполненные пункты:
1) переводится прогноз погоды в т.ч описание погоды и город по умолчанию (не переводится город по умолчанию)

Выполненные пункты:
1) время выводится в 24-часовом формате, например: 21:01:00 

2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) 

3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" 

4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток 

5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется 

6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз 

7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) 

8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) 

9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения 

10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage 

11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел 

12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) 

13) при загрузке страницы приложения отображается рандомная цитата и её автор 

14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) 

15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause 

16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play 

17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) 

18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем 

19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. 

20) добавлен прогресс-бар в котором отображается прогресс проигрывания 

21) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека 

22) над прогресс-баром отображается название трека 

23) отображается текущее и общее время воспроизведения трека 

24) есть кнопка звука при клике по которой можно включить/отключить звук 

25) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука 

26) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте 

27) переводится язык и меняется формат отображения даты 

28) переводится приветствие и placeholder 

29) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая 

30) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется 

31) в качестве источника изображений может использоваться Unsplash API 

32) в качестве источника изображений может использоваться Flickr API 

33) в настройках приложения можно указать язык приложения (en/ru или en/be)  

34) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API 

35) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал 

36) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их 

37) Настройки приложения сохраняются при перезагрузке страницы

`)

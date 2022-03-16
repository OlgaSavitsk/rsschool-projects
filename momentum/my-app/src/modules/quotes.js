const quoteText = document.querySelector('.quote')
const authorText = document.querySelector('.author')
const quotesBtn = document.querySelector('.change-quote')
const translateBtn = document.querySelectorAll('.translate-btn ')
let randomIndex

async function getQuotes() {
    const response = await fetch('data.json');
    const dataQuots = await response.json();
   return dataQuots  
} 

async function getRandomQuotesIndex() {
    const quotes = await getQuotes()
    const currentRandomIndex = Math.floor(Math.random() * quotes.length)
    randomIndex = currentRandomIndex
   return currentRandomIndex
}

async function setQuotes(lang) {
    const index = await getRandomQuotesIndex()
    const quotes = await getQuotes()
    const quote = quotes[index] 
    quoteText.textContent = `${quote[lang].text}`
    authorText.textContent = `${quote[lang].author}`
}

async function setQuotesTranslate(lang) {
    const quotes = await getQuotes()
    const currentQuote = quotes[randomIndex]
    if(lang === 'ru') {
        quoteText.textContent = `${currentQuote['ru'].text}`
    authorText.textContent = `${currentQuote['ru'].author}`
    } else if (lang === 'en'){
        quoteText.textContent = `${currentQuote['en'].text}`
        authorText.textContent = `${currentQuote['en'].author}`
    } 
} 

async function getSlideQuotes() {
    randomIndex++
    if(randomIndex > 6) {
        randomIndex = 1
    } 
    for(let btn of translateBtn) {
        if(btn.classList.contains('color')) {  
            let lng = btn.textContent   
            await setQuotesTranslate(lng) 
        } 
    } 
} 

quotesBtn.addEventListener('click', async() => {
    await getSlideQuotes()
})  

export {setQuotes, setQuotesTranslate}
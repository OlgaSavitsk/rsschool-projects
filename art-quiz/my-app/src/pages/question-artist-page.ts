import Control from "../common/control"
import { AnswerContainer } from "../components/answer/answer"
import { HeaderQuestions } from "../components/header-questions/header-questions"
import { QuestionsImage } from "../components/questions-image/questions-image"
import { IImageModel } from "../models/image-model"
import { delay } from "../common/delay"
import { ModalImageInformation } from "../components/modal-image-information/modal-image-information"
import { MODAL_SHOW_DELAY } from "../constants"
import { ModalCongratulation } from "../components/modal-congratulation/modal-congratulation"
import { Footer } from "../components/footer/footer"

export class QuestionsArtistPage extends Control {
    imageNumber!: number
    indexImage: number
    setAnswer: Set<any>
    isCorrect!: boolean
    indexCategory: number
    questionsImage!: QuestionsImage
    answer!: AnswerContainer
    answerArr: IImageModel[]
    correctAnswer: Set<any>
    correct: string[]
    answerStorage: string[]
    storageValue: any 
    headerQuestions: HeaderQuestions
    modal!: ModalImageInformation
    secondCount!: string | null
    correctAnsw: any
    volumeValue: any
    footer!: Footer
    timerValue: any
    setTime!: any
    modalCongratulation!: ModalCongratulation

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'container', '')
        this.headerQuestions = new HeaderQuestions(this.node, 'Кто автор данной картины ?')  
        this.indexImage = 0
        this.setImage(indexCategory, this.indexImage)  
        this.setAnswers()  
        this.correctAnswer = new Set()
        this.setAnswer = new Set()
        this.answerArr = new Array()
        this.indexCategory = indexCategory
        this.correct = []
        this.answerStorage = []
        this.storageValue = new Array(10)
        this.storageValue = JSON.parse(localStorage.getItem('answers')!) || []
       
        this.timerValue = JSON.parse(localStorage.getItem('time')!) || [] 
        if(this.timerValue.isTime === true) {
            this.stopTimer()
        }    
    }

    getVolumeLocalStorage() {
        this.volumeValue = JSON.parse(localStorage.getItem('volume')!) || []
    } 

    playAudio(url: string) {
        this.getVolumeLocalStorage()
        const audio = new Audio(url)
        audio.play()
        if(this.volumeValue.length !== 0) {
            audio.volume = this.volumeValue
        }
        if(this.volumeValue.length === 0) {
            audio.volume = 0 
        } 
        else audio.volume = 0.4
    }

    async getData() {
        const response = await fetch('images.json');
        const categories = await response.json();
        const questionByAuthor: IImageModel[] = []
        const questionByPicture: IImageModel[] = []
       /*  categories.forEach((item: IImageModel, index: number) => {
            if(index % 2 === 0) {
                questionByAuthor.push(item)
            }
            if(index % 2 !== 0) {
                questionByPicture.push(item)
            }
        }) */      
        return categories
    }

   async setImage(indexCategory: number, indexImage: number) {
    const splitArr = (arr, chunks) => [
        ...Array(chunks),
      ].map((_, c) => arr.filter((n, index) => index % chunks === c)); 
      await this.getData().then(res => {
        const newQuestionByAuthor = splitArr(res, 24)
        return newQuestionByAuthor
      }).then(res => {
        return res[indexCategory]
    }).then(category => {
        this.imageNumber = category[indexImage].imageNum
        this.correctAnswer.forEach(item => {
            if(item !== category[indexImage]) {
                this.correctAnswer.delete(item)
                this.setAnswer.delete(category[indexImage].author)
            }
        })
        this.correctAnswer.add(category[indexImage])
        this.setAnswer.add(category[indexImage].author)
    })
        this.questionsImage = new QuestionsImage(this.node, this.imageNumber!)
   } 

   async setAnswers() {     
    await this.getData().then((res: any) => {
        const authors = res.map((cat: IImageModel[]) => cat);
        let randomAuthor = authors.sort(() => Math.random() - 0.5)
            for(let i= 0; i <= 2; i++) {
                this.setAnswer.add(randomAuthor[i].author)
            }
            this.answerArr = Array.from(this.setAnswer).slice(-4)         
            this.answer = new AnswerContainer(this.node)
            this.footer = new Footer(this.node) 
            if(this.indexImage === 10){
                this.answer.destroy()
                this.footer.destroy()
            }
            this.answer.getRandomAnswer(this.answerArr)
            this.answer.onAnswerClick = (answer) => {
                this.headerQuestions.timer.stopTimer()
                clearTimeout(this.setTime)
                this.clear()
                this.answerHandler(answer)
                if(this.indexImage === 10){
                   this.footer.destroy()
                }
            }
        })
    }

    async answerHandler(authorName: any) { 
        const correctAnsw = Array.from(this.correctAnswer.values()).map(item => item)
        if(authorName.node.innerHTML === correctAnsw[0].author) {
            authorName.node.classList.add('match')
            this.isCorrect = true
            this.correct.push(correctAnsw[0].author)    
            this.playAudio('./assets/sounds/correct.mp3')
            this.answerStorage.push(correctAnsw[0].imageNum)   
        } 
        if(authorName.node.innerHTML !== correctAnsw[0].author) {
            authorName.node.classList.add('unmatch')
            this.isCorrect = false
            this.playAudio('./assets/sounds/error.mp3')   
        } 
        await delay(MODAL_SHOW_DELAY) 
        this.showModal()
    }

    async showModal() { 
        const correctAnsw = Array.from(this.correctAnswer.values()).map(item => item)
        this.modal = new ModalImageInformation(this.node, this.isCorrect, correctAnsw[0])
        await delay(MODAL_SHOW_DELAY) 
        this.modal.modalContainer.node.classList.add('visible')
        this.modal.onNextButtonClick = () => {
            this.modal.destroy()
            this.nextQuestion()
            if(this.timerValue.isTime === true) {
                this.stopTimer()
            } 
            if(this.indexImage === 10){
                this.headerQuestions.timer.stopTimer()
                clearTimeout(this.setTime)
            }
        } 
    }

    stopTimer() { 
        this.headerQuestions.timer.initTimer()
        this.setTime = setTimeout(() => {
            this.stopTimer()
        }, 1000)  
        this.secondCount = this.headerQuestions.timer.node.textContent
      //  console.log(this.secondCount?.split(''))
        if(this.secondCount?.match(this.timerValue.timeCount)) {  
            this.headerQuestions.timer.stopTimer()
            clearTimeout(this.setTime)
            this.isCorrect = false  
            this.playAudio('./assets/sounds/error.mp3')
           this.showModal()
        } 
    }

    clear() {
        for(let i=0; i < this.setTime; i++){
            clearTimeout(i)
        }
    }

    async nextQuestion() {
        this.questionsImage.destroy()
        this.answer.destroy()
        this.footer.destroy()
        this.modal.destroy()
        this.indexImage++
        this.setImage(this.indexCategory, this.indexImage)
        this.setAnswers()
        if(this.indexImage === 10) { 
            this.modalCongratulation = new ModalCongratulation(this.node, this.indexCategory, this.correct.length, 'categories')
            await delay(MODAL_SHOW_DELAY) 
            this.modalCongratulation.modalContainer.node.classList.add('visible')  
            this.playAudio('./assets/sounds/success.mp3')          
            this.storageValue[this.indexCategory] = this.answerStorage
            localStorage.setItem('answers', JSON.stringify(this.storageValue)) 
        }
    } 
}
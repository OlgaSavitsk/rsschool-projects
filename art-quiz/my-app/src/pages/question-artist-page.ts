import Control from "../common/control"
import { AnswerContainer } from "../components/answer/answer"
import { HeaderQuestions } from "../components/header-questions/header-questions"
import { QuestionsImage } from "../components/questions-image/questions-image"
import { IImageModel } from "../models/image-model"
import { delay } from "../common/delay"
import { ModalImageInformation } from "../components/modal-image-information/modal-image-information"
import { MODAL_SHOW_DELAY } from "../constants"
import { ModalCongratulation } from "../components/modal-congratulation/modal-congratulation"

export class QuestionsArtistPage extends Control {
    imageNumber!: number
    indexImage: number
    setAnswer: Set<any>
    isCorrect!: boolean
    //isChangeAnswer!: boolean
    indexCategory: number
    questionsImage!: QuestionsImage
    answer!: AnswerContainer
    answerArr: IImageModel[]
    correctAnswer: Set<any>
    correct: any
    

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'container', '')
        const headerQuestions = new HeaderQuestions(this.node)
        this.indexImage = 0
        this.setImage(indexCategory, this.indexImage)
        this.setAnswers()
        this.correctAnswer = new Set()
        this.setAnswer = new Set()
        this.answerArr = new Array()
        this.indexCategory = indexCategory
        this.correct = []
    }

    async getData() {
        const response = await fetch('/images.json');
        const categories = await response.json();
        const questionByAuthor: IImageModel[] = []
        const questionByPicture: IImageModel[] = []
        categories.forEach((item: IImageModel, index: number) => {
            if(index % 2 === 0) {
                questionByAuthor.push(item)
            }
            if(index % 2 !== 0) {
                questionByPicture.push(item)
            }
        })      
        return questionByAuthor
    }

   async setImage(indexCategory: number, indexImage: number) {
    const splitArr = (arr, chunks) => [
        ...Array(chunks),
      ].map((_, c) => arr.filter((n, index) => index % chunks === c)); 
      await this.getData().then(res => {
        const newQuestionByAuthor = splitArr(res, 12)
        return newQuestionByAuthor
      }).then(res => {
       console.log('res1',res)
        return res[indexCategory]
    }).then(category => {
        this.imageNumber = category[indexImage].imageNum
        this.correctAnswer.forEach(item => {
            console.log('item', item)
            if(item !== category[indexImage]) {
                this.correctAnswer.delete(item)
                this.setAnswer.delete(category[indexImage].author)
            }
        })
        this.correctAnswer.add(category[indexImage])
        this.setAnswer.add(category[indexImage].author)
        console.log('set', this.setAnswer)
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
            console.log('setAnswer', this.setAnswer)
            this.answerArr = Array.from(this.setAnswer).slice(-4)         
            this.answer = new AnswerContainer(this.node)
            this.answer.getRandomAnswer(this.answerArr)
            this.answer.onAnswerClick = (answer) => {
                this.answerHandler(answer)
            }
        })
    }

    async answerHandler(authorName: any) {  
        const correctAnswer = Array.from(this.correctAnswer.values()).map(item => item) 
        console.log('correctAnswer', correctAnswer)
        if(authorName.node.innerHTML === correctAnswer[0].author) {
            authorName.node.classList.add('match')
            this.isCorrect = true
            this.correct.push(correctAnswer[0].author)
        }  else {
            authorName.node.classList.add('unmatch')
            this.isCorrect = false
        } 
        await delay(MODAL_SHOW_DELAY) 
        const modal = new ModalImageInformation(this.node, this.isCorrect, correctAnswer[0])
        modal.onNextButtonClick = () => {
            modal.destroy()
            this.nextQuestion()
        } 
    }

    nextQuestion() {
        this.questionsImage.destroy()
        this.answer.destroy()
        this.indexImage++
        this.setImage(this.indexCategory, this.indexImage)
        this.setAnswers()
        if(this.indexImage === 10) {
            new ModalCongratulation(this.node, this.indexCategory, this.correct.length)
        }
    }
}
import Control from "../../common/control";

export class PictureCategoriesCard extends Control {
    public onChangeCategoryQuestions!: (() => void)
    correctAnswerNumber!: number;
    scoreInfo: Control<HTMLElement>;
    categoryImage: Control<HTMLElement>;
    categoryCardLink: Control<HTMLElement>;

    constructor(parentNode: HTMLElement, readonly image: string, number: number, title: string, correctAnswer: number|undefined) {
        super(parentNode, 'div', 'categories-card', '')
        this.image = image
        this.categoryCardLink = new Control(this.node, 'a', 'categories-card link', '') 
        this.categoryCardLink.node.setAttribute('href', `#picture/${number}`)
        this.categoryCardLink.node.innerHTML = `
            <div class="card-score">
                <span class="number">${number}</span>
                <span class="score">${this.setcorrectAnswer(correctAnswer)} / 10</span>
            </div>
                <h3>${title}</h3>`; 
        this.categoryImage = new Control(this.node, 'div', 'category-image grayscale', '') 
        this.categoryCardLink.node.insertAdjacentElement('beforeend', this.categoryImage.node)  
        this.scoreInfo = new Control(this.node, 'a', 'score-info link', '')
        this.scoreInfo.node.setAttribute('href', `#score-picture/${number}`)
        this.scoreInfo.node.innerHTML = `<div>Score</div>`
        if(this.correctAnswerNumber === 0) {
            this.scoreInfo.destroy()
        } else {
            this.categoryImage.node.classList.remove('grayscale')  
        }
        this.styleBg(this.image)
        this.categoryCardLink.node.onclick = () => {
            this.onChangeCategoryQuestions()
        }
    }

    setcorrectAnswer(correctAnswer: number|undefined) {
        if(typeof(correctAnswer) === 'undefined') {
            this.correctAnswerNumber = 0 
        } else {
            this.correctAnswerNumber = correctAnswer
        }
        return this.correctAnswerNumber
    } 

    async styleBg(i: string) {
        const img = new Image();  
        img.src = `../assets/${i}` 
        img.onload = () => {
        this.categoryImage.node.style.backgroundImage = `url(${img.src})`; 
        } 
    }
}
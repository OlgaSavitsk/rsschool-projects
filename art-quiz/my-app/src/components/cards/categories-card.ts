import Control from "../../common/control";

export class CategoriesCard extends Control {
    correctAnswerNumber!: number
    public onChangeCategoryQuestions!: (() => void)
    //scoreInfo: Control<HTMLElement>;

    constructor(parentNode: HTMLElement, readonly image: string, number: number, title: string) {
        super(parentNode, 'div', 'categories-card', '')
        this.node.innerHTML = `
        <a class="categories-card link" href="#categories/${number}">
        <span class="number">${number}</span>
        <div class="card-score">
            <h3>${title}</h3>
            <span class="score">${this.correctAnswerNumber} / 10</span>
        </div>
            <div class="category-image" style="background-image: url('../assets/${image}')"></div>
            </a>
            <a class="score-info link" href="#score/${number}">
            <div>Score</div></a>`;
            //this.scoreInfo = new Control(this.node, 'div', 'score-info', '')
        this.node.onclick = () => {
            this.onChangeCategoryQuestions()
        }
    }

  /*   getCorrectAnswerNumber(number: number) {
        this.correctAnswerNumber = number
        return this.correctAnswerNumber
    } */
}
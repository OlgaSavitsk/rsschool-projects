import Control from "../../common/control"
import { IImageModel } from "../../models/image-model"

export class ModalImageInformation extends Control {
    modalContainer: Control<HTMLElement>
    modalButton: Control<HTMLButtonElement>
    isCorrect: boolean
    correctAnswer: IImageModel
    iconSrc: string
    onNextButtonClick: (() => void) | undefined

    constructor(parentNode: HTMLElement, isCorrect: boolean, correctAnswer: IImageModel) {
        super(parentNode, 'div', 'modal', '')
        this.correctAnswer = correctAnswer
        this.isCorrect = isCorrect
        if(this.isCorrect === true) {
            this.iconSrc = 'check-success.svg'
        } else {
            this.iconSrc = 'check-failure.svg'
        }
        this.modalContainer = new Control(this.node, 'div', 'modal-container', '')
        this.modalContainer.node.innerHTML = `<div class="modal-check" style="background-image: url('../assets/svg/${this.iconSrc}')"></div>
            <div class="modal-image" style="background-image: url('./assets/img/img/${this.correctAnswer.imageNum}.jpg')"></div>
            <span>${this.correctAnswer.name}</span>
            <span>${this.correctAnswer.author}</span>
            <span>${this.correctAnswer.year}</span>`
        this.modalButton = new Control(this.node, 'button', 'settings', 'next')
        this.modalContainer.node.insertAdjacentElement('beforeend', this.modalButton.node)
        this.modalButton.node.onclick = () => {
            if(this.onNextButtonClick) {
                this.onNextButtonClick()
            }
        }
    }
}

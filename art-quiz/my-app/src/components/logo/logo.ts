import Control from "../../common/control";

export class Logo extends Control {
    onToggleToHome!: () => void

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'logo', '')
        this.node.innerHTML = `
        <a href="#">
        <img src="./assets/img/logo.png" alt="">
        </a>`
        this.node.onclick = () => {
            this.onToggleToHome()
        }
    }
}
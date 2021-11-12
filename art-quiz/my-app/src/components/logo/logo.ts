import Control from "../../common/control";

export class Logo extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'logo', '')
        this.node.innerHTML = `<img src="./assets/img/logo.png" alt="">`
    }
}
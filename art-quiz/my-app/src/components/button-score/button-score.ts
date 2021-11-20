import Control from "../../common/control";

export class ButtonScore extends Control {
   private buttonHome: Control<HTMLButtonElement>;
   private buttonScore: Control<HTMLButtonElement>;
    categoriesTitle: Control<HTMLElement>;

    constructor(parentNode: HTMLElement, categoriesPath: string) {
        super(parentNode, 'div', 'button-container', '')
        this.buttonHome = new Control(this.node, 'button', 'settings', 'home')
        this.buttonHome.node.innerHTML = `
            <a class="settings link" href="#">
            <span class="settings-icon home"></span>home
            </a>`
        this.categoriesTitle = new Control(this.node, 'h2', '', 'score' )
        this.buttonScore = new Control(this.node, 'button', 'settings', 'category')
        this.buttonScore.node.innerHTML = `
            <a class="settings link" href="#${categoriesPath}">
            <span class="settings-icon category"></span>category
            </a>`
    }
}
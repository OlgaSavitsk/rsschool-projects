import Control from "../../common/control";

export class ButtonCategories extends Control {
   private buttonHome: Control<HTMLButtonElement>;
   private buttonScore: Control<HTMLButtonElement>;
    categoriesTitle: Control<HTMLElement>;

    constructor(parentNode: HTMLElement, title: string) {
        super(parentNode, 'div', 'button-container', '')
        this.buttonHome = new Control(this.node, 'button', 'settings', 'home')
        this.buttonHome.node.innerHTML = `
            <a class="settings link" href="#">
            <span class="settings-icon home"></span>home
            </a>`
        this.categoriesTitle = new Control(this.node, 'h2', '', `${title}` )
        this.buttonScore = new Control(this.node, 'button', 'settings', 'score')
        this.buttonScore.node.innerHTML = `
            <a class="settings link" href="#score">
            <span class="settings-icon score"></span>score
            </a>`
    }
}
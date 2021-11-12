import Control from "../../common/control";

export class ButtonCategories extends Control {
   private buttonHome: Control<HTMLButtonElement>;
   private buttonScore: Control<HTMLButtonElement>;
    categoriesTitle: Control<HTMLElement>;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'button-container', '')
        this.buttonHome = new Control(this.node, 'button', 'settings', 'home')
        this.buttonHome.node.innerHTML = `<span class="settings-icon home"></span>home`
        this.categoriesTitle = new Control(this.node, 'h2', '', 'categories' )
        this.buttonScore = new Control(this.node, 'button', 'settings', 'score')
        this.buttonScore.node.innerHTML = `<span class="settings-icon score"></span>score`
    }
}
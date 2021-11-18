import Control from "../../common/control";

export class ButtonCongratulation extends Control {
   private buttonHome: Control<HTMLButtonElement>;
   private buttonNextQuiz: Control<HTMLButtonElement>;
   indexCategory: number;

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'button-container', '')
        this.indexCategory = indexCategory + 2
        this.buttonHome = new Control(this.node, 'button', 'settings', 'home')
        this.buttonHome.node.innerHTML = `
            <a class="settings link" href="#">
            <span class="settings-icon home"></span>home
            </a>`
        this.buttonNextQuiz = new Control(this.node, 'button', 'settings', 'next quiz')
        this.buttonNextQuiz.node.innerHTML = `
        <a class="settings link" href="#categories">next quiz</a>`    
       /*  this.buttonNextQuiz.node.innerHTML = `
        <a class="settings link" href="#categories/${this.indexCategory}">next quiz</a>`    
            this.buttonNextQuiz.node.onclick = () => {
                this.indexCategory++
               console.log('ind',indexCategory)
            } */
    }
}
import Control from "../../common/control";

export class StoreCard extends Control {
    imageScore: Control<HTMLElement>;
    indexCategory: any;
    //imageScore: Control<HTMLElement>;
   /* 
    public onChangeCategoryQuestions!: (() => void) */

    constructor(parentNode: HTMLElement, readonly image: any, indexCategory) {
        super(parentNode, 'div', 'score-card', '')
        this.image = image
        this.indexCategory = indexCategory
        this.node.innerHTML = `<h3 class="score-title">bbbb</h3>`;
        this.imageScore = new Control(this.node, 'div', 'score-image grayscale', '')
        this.styleBg()
        this.getLocalStorageAnswer(this.image)
      /*   this.node.onclick = () => {
            this.onChangeCategoryQuestions()
        } */
    }

    async styleBg() {
        const img = new Image();  
        img.src = `https://raw.githubusercontent.com/OlgaSavitsk/image-data/master/img/${this.image.imageNum}.jpg` 
        img.onload = () => {
        this.imageScore.node.style.backgroundImage = `url(${img.src})`; 
        } 
    } 

    getLocalStorageAnswer(image) {
        const storageValue = JSON.parse(localStorage.getItem('answers')!) || []
        storageValue[this.indexCategory].map((item: number) => {
            if(item === image.imageNum) {
                this.imageScore.node.classList.remove('grayscale')
            }
        }) 
    }
}
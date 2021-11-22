import Control from "../../common/control";

export class ScoreCard extends Control {
    imageScore: Control<HTMLElement>;
    indexCategory: number;
    isPictureCategory: boolean;
    scoreInfo: any;
    onClickInformation!: () => void

    constructor(parentNode: HTMLElement, readonly image: any, indexCategory: number, isPictureCategory: boolean) {
        super(parentNode, 'div', 'score-card', '')
        this.isPictureCategory = isPictureCategory
        this.image = image
        this.indexCategory = indexCategory
        this.node.innerHTML = `<h3 class="score-title">bbbb</h3>`;
        this.imageScore = new Control(this.node, 'div', 'score-image grayscale', '')
        this.styleBg()
        this.setScoreCard()
    }

    async styleBg() {
        const img = new Image();  
        img.src = `https://raw.githubusercontent.com/OlgaSavitsk/image-data/master/img/${this.image.imageNum}.jpg` 
        img.onload = () => {
        this.imageScore.node.style.backgroundImage = `url(${img.src})`; 
        } 
    } 

    async getLocalStorageAnswer(localStorageName: string) {
        const storageValue = await JSON.parse(localStorage.getItem(localStorageName)!) || []
        storageValue[this.indexCategory].map((item: number) => {
            if(item === this.image.imageNum) {
                this.imageScore.node.classList.remove('grayscale')
                this.scoreInfo = new Control(this.node, 'div', 'score-info-card', '')
        this.scoreInfo.node.innerHTML = `<div>${this.image.name}</div>
        <div>${this.image.author}</div>
        <div>${this.image.year}</div>`
            }
        }) 
    }

    setScoreCard() {
        if(this.isPictureCategory === true) {
            this.getLocalStorageAnswer('answers-picture')
        } else  this.getLocalStorageAnswer('answers')
    }
}
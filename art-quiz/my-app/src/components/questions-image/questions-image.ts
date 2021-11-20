import Control from "../../common/control"

export class QuestionsImage extends Control {
    dotsContainer: Control<HTMLElement>
    dot: Control<HTMLElement>
    imageContainer: Control<HTMLElement>
    i: number

    constructor(parentNode: HTMLElement, i: number) {
        super(parentNode, 'div', 'settings-container', '')
        this.i = i
        this.imageContainer = new Control(this.node, 'div', 'question-image', '')
       this.dotsContainer = new Control(this.node, 'div', 'dots-container', '')
       this.dot = new Control(this.node, 'span', 'dot', '')
       this.dotsContainer.node.appendChild(this.dot.node)
       this.styleBg(this.i)
    }

    async styleBg(i: number) {
        const img = new Image();  
        img.src = `https://raw.githubusercontent.com/OlgaSavitsk/image-data/master/img/${i}.jpg` 
        img.onload = () => {
        this.imageContainer.node.style.backgroundImage = `url(${img.src})`; 
        } 
    }
}

//style="background-image: url('../assets/img/img/${i}.jpg')"
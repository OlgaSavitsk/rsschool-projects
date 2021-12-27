import Control from "@/common/control";
import GarlandButton from "./garland-btn";
import MulticolorButton from "./multicolor-btn";

export type GarlandBtn = {
    multicolor: Multicolor
    red: string,
    blue: string,
    yellow: string,
    green: string
}

export type Multicolor = {
        multi: string,
        yellow: string,
        red: string,
        blue: string,
        green: string,
}

export const garlandBtns = <GarlandBtn> {
    multicolor: {
        multi: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8)',
        yellow: 'hsl(60, 100%, 80%)',
        red: '#F00',
        blue: '#24E0FF',
        green: '#00f7a5',
    },
    yellow: 'hsl(60, 100%, 80%)',
    red: '#F00',
    blue: '#24E0FF',
    green: '#00f7a5'
} 

export default class GarlandBtns extends Control {
    garlandBtn!: GarlandButton;
    onGarlandColor!: (bgColor: string | Multicolor) => void
    multiBtn: MulticolorButton;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'garland-btns', '');
      this.multiBtn = new MulticolorButton(this.node)
      this.renderCard()
    }

    public renderCard(): void {
        const garlandColors = Object.values(garlandBtns).map((name) => name);
        console.log(garlandColors)
        garlandColors.map((bgColor) => {    
            if(typeof(bgColor) === 'string') {
                this.garlandBtn = new GarlandButton(this.node, bgColor)
                this.garlandBtn.node.onclick = () => {
                   this.onGarlandColor(bgColor)
                }
            } 
        });
        
      }
}
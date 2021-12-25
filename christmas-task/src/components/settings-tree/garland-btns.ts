import Control from "@/common/control";
import GarlandButton from "./garland-btn";

type GarlandBtn = {
    multicolr: string,
    red: string,
    blue: string,
    yellow: string,
    green: string
}

const garlandBtns = <GarlandBtn> {
    multicolr: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8)',
    red: '#F00',
    blue: '#24E0FF',
    yellow: '#FF0',
    green: '#ABFF00'
} 

export default class GarlandBtns extends Control {
    garlandBtn!: GarlandButton;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'garland-btns', '');
      this.renderCard()
    }

    public renderCard(): void {
        const garlandColors = Object.keys(garlandBtns).map((name) => name);
        garlandColors.map((bgColor: string) => {
            this.garlandBtn = new GarlandButton(this.node, bgColor)
        });
      }
}
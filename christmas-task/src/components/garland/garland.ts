import Control from "@/common/control";

export default class Garland extends Control {
  max = 300
  a = 10;
  ligth!: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement, public garlandColor: string) {
      super(parentNode, 'div', 'garland hide', '');
      this.renderGarland()
    }

    public renderGarland(): void {
      for(let i = 0; i < this.max; i++) {
        let angle = 1.6 * i;
        var x = angle * Math.cos(angle) + 800 / 2;
        var y = angle * Math.sin(angle) - 300;
        this.ligth = new Control(this.node, 'span', 'dot sparkle', '')
        this.ligth.node.style.setProperty('--i', `${i}`)
        let size = 10;
        this.ligth.node.style.width = size + "px";
        this.ligth.node.style.height = size + "px";
        this.ligth.node.style.left = x + "px";
        this.ligth.node.style.top = y + "px";
        if(this.garlandColor === 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8)') {
          this.ligth.node.classList.add('multicolor');
        } else this.ligth.node.style.background = `${this.garlandColor}`;
        }
        
      }
}
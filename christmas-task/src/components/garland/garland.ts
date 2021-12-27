import Control from "@/common/control";

export default class Garland extends Control {
  max = 300
  a = 10;
  
    constructor(parentNode: HTMLElement, public garlandColor: string) {
      super(parentNode, 'div', 'garland hide', '');
      console.log(garlandColor)
      this.renderGarland()
    }

    public renderGarland(): void {
      for(let i = 0; i < this.max; i++) {
        let angle = 1.6 * i;
        var x = angle * Math.cos(angle) + 800 / 2;
        var y = angle * Math.sin(angle) - 300;
        const ligth = new Control(this.node, 'span', 'dot sparkle', '')
        ligth.node.style.setProperty('--i', `${i}`)
        let size = 10;
        ligth.node.style.width = size + "px";
        ligth.node.style.height = size + "px";
        ligth.node.style.left = x + "px";
        ligth.node.style.top = y + "px";
        ligth.node.style.background = `${this.garlandColor}`;
        }
      }
}
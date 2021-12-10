import Control from '../../../common/control';
import ColorButton from './color-button';

export default class Color extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'color', 'Цвет :');
      this.start()
  }

  async start() {
    const response = await fetch('filter-controls.json');
    const categories = await response.json();
    const [catPicture] = categories;
    const colors = Object.values(catPicture.color).map((color) => `${color}`);
    colors.map((color) => {
       const colorButton = new ColorButton(this.node, color)
    }); 
  }
}
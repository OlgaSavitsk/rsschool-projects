import Control from '../../../common/control';
import SizeButton from './size-button';

export default class Size extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'size', 'Размер :');
      this.start()
  }

  async start() {
    const response = await fetch('filter-controls.json');
    const categories = await response.json();
    const [catPicture] = categories;
    console.log(Object.values(catPicture.size))
    const sizes = Object.values(catPicture.size).map((size) => `${size}`);
    sizes.map((size) => {
       const sizeButton = new SizeButton(this.node, size)
    }); 
  }
}
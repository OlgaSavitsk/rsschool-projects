import Control from '../../../common/control';
import ShapeButton from './shape-button';

export default class Shape extends Control {
  shape!: ShapeButton;
  onSort!: () => void

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'shape', 'Форма :');
      this.start()
  }

  async start() {
    const response = await fetch('filter-controls.json');
    const categories = await response.json();
    const [catPicture] = categories;
    const images = Object.values(catPicture.shape).map((name) => `svg/${name}`);
    images.map((url) => {
        this.shape = new ShapeButton(this.node, url)
        this.shape.node.onclick = () => {
          this.onSort()
        }
    }); 
  }
}
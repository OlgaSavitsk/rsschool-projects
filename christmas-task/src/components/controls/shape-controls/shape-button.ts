import Control from '../../../common/control';

export default class ShapeButton extends Control {
  isChecked: boolean = false;
  //onSort!: () => void

  constructor(parentNode: HTMLElement, shapeImage: string) {
    super(parentNode, 'button', '', '');
    this.setShapeImage(shapeImage)
    this.node.onclick = () => {
      //this.onSort()
      this.node.classList.add('select');
      this.isChecked = !this.isChecked;
      if (!this.isChecked) {
        this.node.classList.remove('select');
      }
    }
  }

  async setShapeImage(shapeImage: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `./assets/${shapeImage}`;
      img.onload = () => {
        resolve(img.src);
      };
    })
      .then((src) => {
        this.node.style.backgroundImage = `url(${src})`;
        return this.node;
      });
  } 
}
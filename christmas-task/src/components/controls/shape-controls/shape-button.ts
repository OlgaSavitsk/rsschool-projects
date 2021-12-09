import Control from '../../../common/control';

export default class ShapeButton extends Control {

  constructor(parentNode: HTMLElement, shapeImage: string) {
    super(parentNode, 'button', '', '');
    this.setShapeImage(shapeImage)
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
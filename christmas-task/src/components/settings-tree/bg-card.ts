import Control from '@/common/components/control';

export default class BgCard extends Control {
  constructor(parentNode: HTMLElement, num: string) {
    super(parentNode, 'div', 'bg menu-item', '');
    this.node.style.backgroundImage = `url(./assets/bg/${num}.jpg)`;
  }
}

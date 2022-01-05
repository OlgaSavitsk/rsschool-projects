import Control from '@/common/components/control';
import GarlandButton from './garland-btn';

export type GarlandBtn = {
  multicolor: string
  red: string,
  blue: string,
  yellow: string,
  green: string
};

export const garlandBtns = <GarlandBtn> {
  multicolor: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8)',
  yellow: 'hsl(60, 100%, 80%)',
  red: '#F00',
  blue: '#24E0FF',
  green: '#00f7a5',
};

export default class GarlandBtns extends Control {
  garlandBtn!: GarlandButton;

  onGarlandColor!: (bgColor: string) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'garland-btns', '');
    this.renderCard();
  }

  public renderCard(): void {
    const garlandColors = Object.values(garlandBtns).map((name) => name);
    garlandColors.map((bgColor) => {
      this.garlandBtn = new GarlandButton(this.node, bgColor);
      this.garlandBtn.node.onclick = () => {
        this.onGarlandColor(bgColor);
      };
      return false;
    });
  }
}

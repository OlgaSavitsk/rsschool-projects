import Control from '@/common/components/control';
import {
  GARLAND_HEIGTH, GARLAND_WIDTH, LIGHTS_SPACING, LIGHT_SIZE, MAX_LIGHTS_COUNT,
} from '@/common/constants/constants';

export default class Garland extends Control {
  private lightSize = LIGHT_SIZE;

  public light!: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, public garlandColor: string) {
    super(parentNode, 'div', 'garland hide', '');
    this.renderGarland();
  }

  public renderGarland(): void {
    for (let i = 0; i < MAX_LIGHTS_COUNT; i += 1) {
      const angle = LIGHTS_SPACING * i;
      const x = angle * Math.cos(angle) + GARLAND_WIDTH;
      const y = angle * Math.sin(angle) - GARLAND_HEIGTH;
      this.setLightsStyle(i, x, y);
    }
  }

  private setLightsStyle(i: number, x: number, y: number): void {
    this.light = new Control(this.node, 'span', 'dot sparkle', '');
    this.light.node.style.setProperty('--i', `${i}`);
    this.light.node.style.width = `${this.lightSize}px`;
    this.light.node.style.height = `${this.lightSize}px`;
    this.light.node.style.left = `${x}px`;
    this.light.node.style.top = `${y}px`;
    this.setMulticolorGarland();
  }

  private setMulticolorGarland(): void {
    if (this.garlandColor === 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8)') {
      this.light.node.classList.add('multicolor');
    } else this.light.node.style.background = `${this.garlandColor}`;
  }
}

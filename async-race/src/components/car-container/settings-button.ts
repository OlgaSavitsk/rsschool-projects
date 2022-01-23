import Control from '@/common/components/control';
import { ICar } from '@/models/car-model';

export default class SettingsButtons extends Control {
  public selectButton: Control<HTMLElement>;

  public removeButton: Control<HTMLElement>;

  private carName: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, public car: ICar) {
    super(parentNode, 'div', 'setting-buttons', '');
    this.selectButton = new Control(this.node, 'button', 'button settings-button', 'Select');
    this.removeButton = new Control(this.node, 'button', 'button settings-button', 'Remove');
    this.carName = new Control(this.node, 'span', 'car-name', `${car.name}`);
  }
}

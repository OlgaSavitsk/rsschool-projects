import Control from "@/common/components/control";
import AnimateControl from "@/utils/animation";
import { ICar } from "@/models/car-model";

export default class Car extends Control {
  public flag: Control<HTMLElement>;
  public car: AnimateControl;
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'race');
      this.car = new AnimateControl(this.node, 'div', 'car', '')
      this.car.node.style.backgroundColor = `${carData.color}`
      this.flag = new Control(this.node, 'div', 'flag')
    }
}
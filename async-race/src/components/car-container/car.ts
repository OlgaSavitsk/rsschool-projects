import Control from "@/common/components/control";
import AnimateControl from "@/common/services/animate";
import { ICar } from "@/models/car-model";

export default class Car extends AnimateControl {
    car: Control<HTMLElement>;
  flag: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'race');
      this.car = new Control(this.node, 'div', 'car', '')
      this.car.node.style.backgroundColor = `${carData.color}`
      this.flag = new Control(this.node, 'div', 'flag')
    }
}
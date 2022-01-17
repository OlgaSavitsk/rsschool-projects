import Control from "@/common/components/control";
import { ICar } from "@/models/car-model";

export default class Car extends Control {
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'race', '');
      const car = new Control(this.node, 'div', 'car', '')
      car.node.style.backgroundColor = `${carData.color}`
      const flag = new Control(this.node, 'div', 'flag')
    }
}
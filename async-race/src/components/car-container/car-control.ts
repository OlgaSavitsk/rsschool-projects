import Control from "@/common/components/control";
import { ICar } from "@/models/car-model";
import Car from "./car";

export default class CarControl extends Control {
    public startButton: Control<HTMLElement>;
    public stopButton: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'car-control-container', '');
      this.startButton = new Control(this.node, 'button', 'control', 'START');
      this.stopButton = new Control(this.node, 'button', 'control', 'STOP');
      const car = new Car(this.node, carData)
    }
}
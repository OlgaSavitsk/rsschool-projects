import Control from "@/common/components/control";
import { ICar } from "@/models/car-model";
import Car from "./car";

export default class CarControl extends Control {
    public startButton: Control<HTMLButtonElement>;
    public stopButton: Control<HTMLButtonElement>;
    public car: Car;
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'car-control-container', '');
      this.startButton = new Control(this.node, 'button', 'control active', 'START');
      this.stopButton = new Control(this.node, 'button', 'control', 'STOP');
      this.stopButton.node.disabled = true
      this.car = new Car(this.node, carData)
      this.setEventListener()
    }

    private setEventListener(): void {
      this.startButton.node.onclick = async () => {
        this.startButton.node.disabled = true
        this.stopButton.node.disabled = false
        this.startButton.node.classList.toggle('active')
        this.stopButton.node.classList.toggle('active')
        await this.car.car.startDriving(this.carData.id)
      }
      this.stopButton.node.onclick = async () => {
        this.stopButton.node.disabled = true
        this.stopButton.node.classList.toggle('active')
        this.startButton.node.disabled = false
        this.startButton.node.classList.toggle('active')
        await this.car.car.stopDriving(this.carData.id)
        this.stopButton.node.classList.remove('active')
        this.stopButton.node.disabled = true
      }
    }
}
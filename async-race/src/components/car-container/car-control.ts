import ApiEngine from "@/common/api/api-engine";
import Control from "@/common/components/control";
import { winners } from "@/common/constants/api-constants";
import { state } from "@/common/state";
import { ICar } from "@/models/car-model";
import Car from "./car";

export default class CarControl extends Control {
    public startButton: Control<HTMLButtonElement>;
    public stopButton: Control<HTMLButtonElement>;
    private apiEngine: ApiEngine;
    private car: Car;
  
    constructor(parentNode: HTMLElement, public carData: ICar) {
      super(parentNode, 'div', 'car-control-container', '');
      this.startButton = new Control(this.node, 'button', 'control active', 'START');
      this.stopButton = new Control(this.node, 'button', 'control active', 'STOP');
      this.car = new Car(this.node, carData)
      this.apiEngine = new ApiEngine()
      this.startButton.node.onclick = async () => {
        const { velocity, distance } = await this.apiEngine.startEngine(carData.id)
        this.startButton.node.disabled = true
        this.startButton.node.classList.toggle('active')
        const time = Math.round(distance / velocity)
        const htmlDistance = Math.floor(this.car.getDistanceBetweenElements(this.car.car.node, this.car.flag.node))
        state.animation = this.car.animation(this.car.car.node, htmlDistance, time)
        const { success } = await this.apiEngine.drive(carData.id)
        if (!success) window.cancelAnimationFrame(state.animation.id)
      }
      this.stopButton.node.onclick = async () => {
        this.stopButton.node.disabled = true
        this.stopButton.node.classList.toggle('active')
        await this.apiEngine.stopEngine(carData.id)
        this.stopButton.node.classList.toggle('active')
        this.startButton.node.disabled = false
        this.startButton.node.classList.toggle('active')
        this.car.car.node.style.transform = `translateX(0)`
        if (state.animation) window.cancelAnimationFrame(state.animation.id)
      }
    }
}
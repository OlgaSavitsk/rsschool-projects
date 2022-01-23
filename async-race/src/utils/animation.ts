import { ICarCenterPosition } from "@/models/car-model";
import { IDriveModeModel, IDrivingParam, IEngineModel } from "@/models/engine-model";
import ApiEngine from "../api/api-engine";
import Control from "../common/components/control";

export default class AnimateControl extends Control {

  map: Map<string, number>;

    constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
      super(parentNode, tagName, className, content)
      this.map = new Map()
    }

    private getCenterPosition(element: HTMLElement): ICarCenterPosition {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
          x: left + width / 2,
          y: top + height / 2,
        };
      }
    
      private getDistanceBetweenElements(): number {
        const aPosition = this.getCenterPosition(this.node);
          const bPosition = this.getCenterPosition(this.node.nextElementSibling as HTMLElement);
          return Math.sqrt(
            Math.pow(aPosition.x - bPosition.x, 2) + 
            Math.pow(aPosition.y - bPosition.y, 2) 
          );
      }
    
      private animation(distance: number, animationTime: number, i: string): Map<string, number> {
        let start: number | null = 0;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          let progress = timestamp - start;
          const passed = Math.round(progress * (distance / animationTime));
          this.node.style.transform = `translateX(${Math.min(passed, distance)}px)`;
          if (passed < distance) {
            this.map.set(i, window.requestAnimationFrame(step))
          }
        };
        this.map.set(i, window.requestAnimationFrame(step))
        return this.map
      }

      public async startDriving(id: string): Promise<IDrivingParam> {
        const { velocity, distance }  = await this.startEngine(id) as IEngineModel
        const time = Math.round(distance / velocity)
        const htmlDistance = Math.floor(this.getDistanceBetweenElements()) 
        this.animation(htmlDistance, time, id)
        const { success } = await this.driveMode(id) as IDriveModeModel 
        return { success, id, time }
      } 

      private async startEngine(id: string): Promise<{velocity: number, distance: number} | void> {
        try{
          return await ApiEngine.startEngine(id)
        } catch(err: unknown) {
          console.error(err)
        }
      }

      private async driveMode(id: string): Promise<IDriveModeModel | void> {
        try{
          return await ApiEngine.drive(id)
        } catch(err) {
          console.error(err)
          if(err) {
             window.cancelAnimationFrame(Object.fromEntries(this.map)[id])
            return {success: false}
          }
        }
      }

      public async stopDriving(id: string): Promise<void> {
        await ApiEngine.stopEngine(id)
        this.node.style.transform = `translateX(0)`
        window.cancelAnimationFrame(Object.fromEntries(this.map)[id])
      }
}
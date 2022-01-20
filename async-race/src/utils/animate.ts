import ApiEngine from "../api/api-engine";
import Control from "../common/components/control";
import { state } from "../common/state";

export default class AnimateControl extends Control {

  map: Map<any, any>;

    constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
      super(parentNode, tagName, className, content)
      this.map = new Map()
    }

    getCenterPosition(element: HTMLElement) {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
          x: left + width / 2,
          y: top + height / 2,
        };
      }
    
      getDistanceBetweenElements(): number {
        const aPosition = this.getCenterPosition(this.node);
          const bPosition = this.getCenterPosition(this.node.nextElementSibling as HTMLElement);
          return Math.sqrt(
            Math.pow(aPosition.x - bPosition.x, 2) + 
            Math.pow(aPosition.y - bPosition.y, 2) 
          );
      }
    
      animation(distance: any, animationTime: number, i: any) {
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

      async startDriving(id: string): Promise<any> {
        const { velocity, distance } = await ApiEngine.startEngine(id)
        const time = Math.round(distance / velocity)
        console.log('time', time)
        const htmlDistance = Math.floor(this.getDistanceBetweenElements()) 
        this.animation(htmlDistance, time, id)
        const { success } = await ApiEngine.drive(id)
        if (!success) {
          window.cancelAnimationFrame(Object.fromEntries(this.map)[id])
        } 
        console.log('time2', time)
        return { success, id, time }
      } 

      async stopDriving(id: string) {
        await ApiEngine.stopEngine(id)
        this.node.style.transform = `translateX(0)`
        if (state.animation) window.cancelAnimationFrame(Object.fromEntries(this.map)[id])
      }
}
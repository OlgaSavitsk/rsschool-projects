import Control from "../components/control";
//import { state } from "../state";

export default class AnimateControl extends Control {

    constructor(parentNode: HTMLElement | null, tagName = 'div',/* , styles: {default:string, hidden:string}, */ content = '') {
        super(parentNode, tagName, /* styles.default, */ content)
    }

    getCenterPosition(element: HTMLElement) {
        const box = element.getBoundingClientRect();
        return {
          x: box.left + box.width / 2,
          y: box.top + box.height / 2,
        };
      }
    
      getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
        const aPosition = this.getCenterPosition(a);
        const bPosition = this.getCenterPosition(b);
        return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
      }
    
      animation(car: HTMLElement, distance: number, animationTime: number) {
        let start: number | null = null;
        const state: { id: number; } = { id: 0 }
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const passed = Math.round(progress * (distance / animationTime));
          car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
          if (passed < distance) {
            state.id = window.requestAnimationFrame(step);
          }
        };
        state.id = window.requestAnimationFrame(step);
        console.log('state', state)
        return state
      }
}
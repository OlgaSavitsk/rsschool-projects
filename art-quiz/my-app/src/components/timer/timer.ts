import Control from '../../common/control';
import ModalImageInformation from '../modal-image-information/modal-image-information';

export default class Timer extends Control {
  stopWhatch!: NodeJS.Timer;

  secondCount: number;

  modal!: ModalImageInformation;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'timer-container', '');
    this.node.innerHTML = `<span class="timer-icon"></span>
        <span class="timer">00:00</span>`;
    this.secondCount = 0;
    this.screenCount();
  }

  screenCount(): void {
    const min: number = Math.floor((this.secondCount % 3600) / 60);
    const sec = Math.floor(this.secondCount % 60);
    const screenMinutes = min < 10 ? `0${min}` : min;
    const screenSeconds = sec < 10 ? `0${sec}` : sec;
    this.node.innerHTML = `<span class="timer-icon"></span>
            <span class="timer">${screenMinutes}:${screenSeconds}</span>`;
    this.secondCount += 1;
  }

  initTimer(): void {
    this.screenCount();
  }

  stopTimer(): void {
    this.secondCount = 0;
    this.node.innerHTML = `<span class="timer-icon"></span>
        <span class="timer">00:00</span>`;
  }
}

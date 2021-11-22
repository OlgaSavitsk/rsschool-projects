import Control from "../../common/control";import { IImageModel } from "../../models/image-model";
import { QuestionsArtistPage } from "../../pages/question-artist-page";
import { ModalImageInformation } from "../modal-image-information/modal-image-information";

export class Timer extends Control {
    stopWhatch!: NodeJS.Timer;
    secondCount: number;
    modal!: ModalImageInformation
    isFinishedTime!: boolean
    questionsArtistPage!: QuestionsArtistPage

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'timer-container', '')
        this.node.innerHTML = `<span class="timer-icon"></span>
        <span class="timer">00:00</span>`
        this.secondCount = 0
        this.isFinishedTime = this.isFinishedTime
        this.screenCount()
    }

    screenCount() {
        const min: number = Math.floor((this.secondCount % 3600) / 60);
        const sec = Math.floor(this.secondCount % 60);
        const screenMinutes = min < 10 ? `0${min}` : min;
        const screenSeconds = sec < 10 ? `0${sec}` : sec;
        this.node.innerHTML = `<span class="timer-icon"></span>
            <span class="timer">${screenMinutes}:${screenSeconds}</span>`
        this.secondCount++;
      }
    
      initTimer() {
        this.screenCount();
      }
    
     stopTimer() {  
        this.secondCount = 0
        //clearInterval(this.stopWhatch);  
        this.node.innerHTML = `<span class="timer-icon"></span>
        <span class="timer">00:00</span>`     
    }
}
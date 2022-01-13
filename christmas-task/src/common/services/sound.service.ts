import { audioLink } from '../constants/app-links';

export default class SoundService {
  public audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio(audioLink);
  }

  public playAudio(): void {
    this.audio.play();
  }

  public pauseAudio(): void {
    this.audio.pause();
  }
}

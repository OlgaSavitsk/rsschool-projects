import baseUrl from '../constants/app-links';

export default class SoundService {
  static audio: HTMLAudioElement;

  static playAudio(): void {
    SoundService.audio = new Audio(baseUrl);
    SoundService.audio.play();
  }

  static pauseAudio(): void {
    SoundService.audio.pause();
  }
}

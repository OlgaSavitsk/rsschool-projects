export default class SoundService {
    static baseUrl = './assets/audio/audio.mp3'
    static audio: HTMLAudioElement

    constructor() {}
  
    static playAudio(): void {
        SoundService.audio = new Audio(SoundService.baseUrl)
        SoundService.audio.play()
    }

    static pauseAudio() {
        SoundService.audio.pause()
    }
}
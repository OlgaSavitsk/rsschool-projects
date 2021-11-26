import Control from '../../common/control';

export default class VolumeSettings extends Control {
  volumeRange: Control<HTMLInputElement>;

  volumeContainer: Control<HTMLElement>;

  volumeValue!: string;

  volumeOffIcon: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'settings-card', '');
    this.volumeContainer = new Control(this.node, 'div', 'range-container', '');
    this.volumeOffIcon = new Control(this.volumeContainer.node, 'img', 'volumeoff-icon', '');
    this.volumeOffIcon.node.setAttribute('src', './assets/svg/volume-off.svg');
    this.volumeRange = new Control(this.volumeContainer.node, 'input', 'progress-volume', '');
    this.volumeRange.node.setAttribute('type', 'range');
    this.volumeRange.node.setAttribute('value', '0.5');
    this.volumeRange.node.setAttribute('min', '0');
    this.volumeRange.node.setAttribute('max', '1');
    this.volumeRange.node.setAttribute('step', '0.05');
    this.volumeRange.node.value = '0.5';
    this.node.innerHTML = '<span class="volume-icon"></span>';
    this.node.insertAdjacentElement('beforeend', this.volumeContainer.node);
    this.node.insertAdjacentHTML('beforeend', '<span class="settings-title">volume</span>');
    this.volumeRange.node.onclick = () => {
      const audio = new Audio('./assets/sounds/correct.mp3');
      audio.play();
      audio.volume = +this.volumeRange.node.value;
    };
    this.volumeRange.node.onchange = () => {
      this.volumeRangeBgd();
    };
    this.volumeOffIcon.node.onclick = () => {
      this.volumeRange.node.value = '0';
      this.volumeRangeBgd();
    };
    this.volumeRangeBgd();
    this.getVolumeLocalStorage();
  }

  getVolumeLocalStorage(): void {
    this.volumeValue = JSON.parse(localStorage.getItem('volume')!) || [];
    if (+this.volumeValue >= 0) {
      this.volumeRange.node.value = this.volumeValue;
    }
    this.volumeRangeBgd();
  }

  volumeRangeBgd(): void {
    const value = +this.volumeRange.node.value * 100;
    this.volumeRange.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${value}%, #E5E5E5 ${value}%, #E5E5E5 100%)`;
  }
}

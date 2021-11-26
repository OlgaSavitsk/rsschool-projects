import Control from '../../common/control';
import TimeSettings from './time-settings';
import VolumeSettings from './volume-settings';

export default class Settings extends Control {
  volumeSettings: VolumeSettings;

  timeSettings: TimeSettings;

  volumeValue: any;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'settings-container', '');
    this.node.insertAdjacentHTML('beforebegin', '<h2>settings</h2>');
    this.volumeSettings = new VolumeSettings(this.node);
    this.timeSettings = new TimeSettings(this.node);
    this.getTimeLocalStorage();
  }

  async getTimeLocalStorage() {
    const timerValue = await JSON.parse(localStorage.getItem('time')!) || [];
    if (timerValue.isTime === true) {
      this.timeSettings.timeLabel.node.style.backgroundImage = 'url(./assets/svg/check.svg)';
      this.timeSettings.isChecked = true;
      this.timeSettings.timeCount.countButtonPlus.node.style.backgroundColor = '#660033';
      this.timeSettings.timeCount.countButtonPlus.node.removeAttribute('disabled');
      this.timeSettings.timeCount.countInput.node.value = timerValue.timeCount.toString();
      if (timerValue.timeCount > 6) {
        this.timeSettings.timeCount.countButton.node.style.backgroundColor = '#660033';
        this.timeSettings.timeCount.countButton.node.removeAttribute('disabled');
      }
      if (timerValue.timeCount === 30) {
        this.timeSettings.timeCount.countButtonPlus.node.style.backgroundColor = '#555555';
        this.timeSettings.timeCount.countButtonPlus.node.setAttribute('disabled', 'disabled');
        this.timeSettings.timeCount.countButton.node.removeAttribute('disabled');
      }
    }
    if (typeof (timerValue.isTime) === 'undefined') {
      this.timeSettings.timeCount.countInput.node.value = '5';
    }
    if (timerValue.isTime === false) {
      this.timeSettings.timeCount.countInput.node.value = timerValue.timeCount.toString();
    }
  }
}

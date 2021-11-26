import Control from '../../common/control';
import ButtonSettings from '../button-settings/button-settings';
import TimeCounter from './time-counter';

export default class TimeSettings extends Control {
  timeInput: Control<HTMLInputElement>;

  timeLabel: Control<HTMLElement>;

  isChecked: boolean = false;

  settingButtons!: ButtonSettings;

  timeCount: TimeCounter;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'settings-card', '');
    this.node.innerHTML = '<span class="time-icon"></span>';
    this.timeCount = new TimeCounter(this.node);
    this.node.insertAdjacentElement('beforeend', this.timeCount.node);
    this.timeLabel = new Control(this.node, 'label', 'label', '');
    this.timeLabel.node.setAttribute('for', 'check');
    this.node.insertAdjacentElement('beforeend', this.timeLabel.node);
    this.timeInput = new Control(this.node, 'input', 'check', '');
    this.timeInput.node.setAttribute('type', 'checkbox');
    this.timeInput.node.id = 'check';
    this.node.insertAdjacentElement('beforeend', this.timeInput.node);
    this.node.insertAdjacentHTML('beforeend', `<span>on/off</span>
            <span class="settings-title">time game</span>`);
    this.timeInput.node.onclick = () => {
      this.timeLabel.node.style.backgroundImage = 'url(./assets/svg/check.svg)';
      this.isChecked = !this.isChecked;
      this.timeInput.node.setAttribute('checked', 'checked');
      this.timeCount.countButtonPlus.node.style.backgroundColor = '#660033';
      this.timeCount.countButtonPlus.node.removeAttribute('disabled');
      if (+this.timeCount.countInput.node.value > 6) {
        this.timeCount.countButton.node.removeAttribute('disabled');
        this.timeCount.countButton.node.style.backgroundColor = '#660033';
      }
      if (+this.timeCount.countInput.node.value > 29) {
        this.timeCount.countButtonPlus.node.setAttribute('disabled', 'disabled');
        this.timeCount.countButtonPlus.node.style.backgroundColor = '#555555';
      }
      if (!this.isChecked) {
        this.timeLabel.node.style.backgroundImage = 'none';
        this.isChecked = false;
        this.timeInput.node.removeAttribute('checked');
        this.timeCount.countButtonPlus.node.setAttribute('disabled', 'disabled');
        this.timeCount.countButton.node.setAttribute('disabled', 'disabled');
        this.timeCount.countButtonPlus.node.style.backgroundColor = '#555555';
        this.timeCount.countButton.node.style.backgroundColor = '#555555';
      }
    };
  }
}

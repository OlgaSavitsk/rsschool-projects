import Control from '../../common/control';

export default class TimeCounter extends Control {
  countButton: Control<HTMLButtonElement>;

  countButtonPlus: Control<HTMLButtonElement>;

  formCounter: Control<HTMLElement>;

  countInput: Control<HTMLInputElement>;

  value!: number;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'counter', '');
    this.countButton = new Control(this.node, 'button', 'minus', '-');
    this.countButton.node.setAttribute('disabled', 'disabled');
    this.formCounter = new Control(this.node, 'div', 'form-counter', '');
    this.countInput = new Control(this.formCounter.node, 'input', 'number', '');
    this.countInput.node.setAttribute('value', '5');
    this.countInput.node.setAttribute('min', '5');
    this.countInput.node.setAttribute('max', '30');
    this.countButtonPlus = new Control(this.node, 'button', 'plus', '+');
    this.countButtonPlus.node.setAttribute('disabled', 'disabled');
    this.countInput.node.value = '5';
    this.countButtonPlus.node.onclick = () => {
      this.value = +this.countInput.node.value;
      this.value += 5;
      this.countInput.node.value = this.value.toString();
      if (this.value > 6) {
        this.countButton.node.removeAttribute('disabled');
        this.countButton.node.style.backgroundColor = '#660033';
      }
      if (this.value > 29) {
        this.value = 30;
        this.countButtonPlus.node.setAttribute('disabled', 'disabled');
        this.countButtonPlus.node.style.backgroundColor = '#555555';
      }
    };
    this.countButton.node.onclick = () => {
      this.value = +this.countInput.node.value;
      this.value -= 5;
      this.countInput.node.value = this.value.toString();
      this.countButtonPlus.node.style.backgroundColor = '#660033';
      if (this.value < 6) {
        this.value = 5;
        this.countButton.node.setAttribute('disabled', 'disabled');
        this.countButtonPlus.node.removeAttribute('disabled');
        this.countButton.node.style.backgroundColor = '#555555';
      }
      if (this.value > 6) {
        this.countButtonPlus.node.removeAttribute('disabled');
      }
    };
  }
}

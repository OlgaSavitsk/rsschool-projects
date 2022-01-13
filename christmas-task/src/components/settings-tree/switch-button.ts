import Control from '@/common/components/control';

export default class SwitchButton extends Control {
  public switchInput: Control<HTMLElement>;

  private switchLabel: Control<HTMLElement>;

  public switchInner: Control<HTMLElement>;

  public switch: Control<HTMLElement>;

  public isChecked!: boolean;

  public onChecked!: (isChecked: boolean) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'switch-container', '');
    this.switchLabel = new Control(this.node, 'label', 'switch', '');
    this.switchInput = new Control(this.switchLabel.node, 'input', 'input', '');
    this.switchInput.node.setAttribute('type', 'checkbox');
    this.switchInput.node.setAttribute('id', 'onoffswitch');
    this.switchLabel.node.setAttribute('for', 'onoffswitch');
    this.switch = new Control(this.switchLabel.node, 'span', 'slider', '');
    this.switchInner = new Control(this.switchLabel.node, 'span', 'switch-inner', '');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.switchInput.node.onclick = () => {
      if (this.isChecked === true) {
        this.isChecked = false;
        this.switchInput.node.removeAttribute('checked');
      } else {
        this.isChecked = true;
        this.switchInput.node.setAttribute('checked', 'checked');
      }
      this.onChecked(this.isChecked);
    };
  }
}

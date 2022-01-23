import Control from '@/common/components/control';

export default class FormCreate extends Control {
  private inputCreateName: Control<HTMLInputElement>;

  private inputColor: Control<HTMLInputElement>;

  public buttonCreate: Control<HTMLElement>;

  public onCreateCar: ((name: string, color: string) => void) | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form-create', '');
    this.inputCreateName = new Control(this.node, 'input', '', '');
    this.inputCreateName.node.setAttribute('type', 'text');
    this.inputColor = new Control(this.node, 'input', 'color-input', '');
    this.inputColor.node.setAttribute('type', 'color');
    this.inputColor.node.setAttribute('value', '#ffffff');
    this.buttonCreate = new Control(this.node, 'button', 'button create-button', 'CREATE');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.buttonCreate.node.onclick = () => {
      if (this.onCreateCar) {
        this.onCreateCar(this.inputCreateName.node.value, this.inputColor.node.value);
      }
    };
  }
}

import Control from '@/common/components/control';

export default class FormUpdate extends Control {
    public inputUpdateName: Control<HTMLInputElement>;
    public inputColor: Control<HTMLInputElement>;
    public buttonUpdate: Control<HTMLElement>;
    public onUpdateCar: ((name: string, color: string) => void) | undefined

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form-create', '');
    this.inputUpdateName = new Control(this.node, 'input', '', '');
    this.inputUpdateName.node.setAttribute('type', 'text');
    this.inputColor = new Control(this.node, 'input', 'color-input', '');
    this.inputColor.node.setAttribute('type', 'color');
    this.inputColor.node.setAttribute('value', '#ffffff');
    this.buttonUpdate = new Control(this.node, 'button', 'button create-button', 'UPDATE');
    this.setEventListener()
  }

  private setEventListener(): void {
    this.buttonUpdate.node.onclick = () => {
      if(this.onUpdateCar) {
        this.onUpdateCar(this.inputUpdateName.node.value, this.inputColor.node.value)
      }
    }
  }
}
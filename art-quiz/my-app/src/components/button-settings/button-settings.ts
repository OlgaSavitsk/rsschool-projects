import Control from '../../common/control';

export default class ButtonSettings extends Control {
  private buttonSave: Control<HTMLButtonElement>;

  private buttonDefault: Control<HTMLButtonElement>;

  onSave!: () => void;

  onDefault!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'button-container', '');
    this.buttonSave = new Control(this.node, 'a', 'settings link', 'save');
    this.buttonSave.node.setAttribute('href', '#');
    this.buttonSave.node.innerHTML = '<button class="settings">save</button>';
    this.buttonDefault = new Control(this.node, 'button', 'settings', 'default');
    this.buttonSave.node.onclick = () => {
      this.onSave();
    };
    this.buttonDefault.node.onclick = () => {
      this.onDefault();
    };
  }
}

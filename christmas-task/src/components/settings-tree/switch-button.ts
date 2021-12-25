import Control from "@/common/control";

export default class SwitchButton extends Control {
    switchInput: Control<HTMLElement>;
    switchLabel: Control<HTMLElement>;
    switchInner: Control<HTMLElement>;
    switch: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'switch-container', '');
      this.switchInput = new Control(this.node, 'input', 'onoffswitch-checkbox', '');
      this.switchInput.node.setAttribute('type', 'checkbox');
      this.switchInput.node.setAttribute('id', 'onoffswitch');
      this.switchLabel = new Control(this.node, 'label', 'onoffswitch-label', '');
      this.switchLabel.node.setAttribute('for', 'onoffswitch');
      this.switchInner = new Control(this.switchLabel.node, 'div', 'onoffswitch-inner', '')
      this.switch = new Control(this.switchLabel.node, 'div', 'onoffswitch-switch', '')

      this.switchInput.node.onclick = () => {
       /*  this.favoriteLabel.node.style.backgroundImage = 'url(./assets/svg/check.svg)';
        this.isChecked = !this.isChecked;
        this.checkValue = 'true';
        if (!this.isChecked) {
          this.checkValue = 'false';
          this.favoriteLabel.node.style.backgroundImage = 'none';
        }
        this.onFilter(this.checkValue); */
      };
    }
  }
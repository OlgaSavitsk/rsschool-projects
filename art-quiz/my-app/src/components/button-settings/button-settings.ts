import Control from "../../common/control";

export class ButtonSettings extends Control {
   private buttonSave: Control<HTMLButtonElement>;
   private buttonDefault: Control<HTMLButtonElement>;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'button-container', '')
        this.buttonSave = new Control(this.node, 'button', 'settings', 'save')
        this.buttonDefault = new Control(this.node, 'button', 'settings', 'default')
    }
}
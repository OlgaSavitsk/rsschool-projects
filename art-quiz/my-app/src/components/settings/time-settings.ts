import Control from "../../common/control";

export class TimeSettings extends Control {
    timeInput: Control<HTMLInputElement>;
    timeLabel: Control<HTMLElement>;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'settings-card', '')
        this.node.innerHTML = `<span class="time-icon"></span>`
        this.timeLabel = new Control(this.node, 'label', 'label', '') 
        this.timeLabel.node.setAttribute('for', 'check')
        this.node.insertAdjacentElement('beforeend', this.timeLabel.node)
        this.timeInput = new Control(this.node, 'input', 'check', '') 
        this.timeInput.node.setAttribute('type', 'checkbox')
        this.timeInput.node.setAttribute('id', 'check')
        this.node.insertAdjacentElement('beforeend', this.timeInput.node)
        this.node.insertAdjacentHTML('beforeend', `<span>on/off</span>
            <span class="settings-title">time game</span>`)
    }
}
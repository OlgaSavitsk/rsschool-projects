import Control from "../../common/control";

export class VolumeSettings extends Control {
    volumeRange: Control<HTMLInputElement>;
    volumeContainer: Control<HTMLElement>;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'settings-card', '')
        this.volumeContainer = new Control(this.node, 'div', 'range-container', '')
        this.volumeContainer.node.innerHTML = `<img src="./assets/svg/volume-off.svg" class="volumeoff-icon" alt="volume">
            <label class="player-title" for="playRate"></label>`
        this.volumeRange = new Control(this.volumeContainer.node, 'input', 'progress-volume', '')      
        this.node.innerHTML = `<span class="volume-icon"></span>`
        this.node.insertAdjacentElement('beforeend', this.volumeContainer.node)
        this.node.insertAdjacentHTML('beforeend', '<span class="settings-title">volume</span>')
    }
}
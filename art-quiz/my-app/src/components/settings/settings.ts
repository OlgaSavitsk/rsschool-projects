import Control from "../../common/control";
import { TimeSettings } from "./time-settings";
import { VolumeSettings } from "./volume-settings";

export class Settings extends Control {

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'settings-container', '')
        this.node.insertAdjacentHTML('beforebegin', '<h2>settings</h2>')
        const volumeSettings = new VolumeSettings(this.node)     
        const timeSettings = new TimeSettings(this.node)
    }
}
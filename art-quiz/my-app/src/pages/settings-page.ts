import Control from "../common/control";
import { ButtonSettings } from "../components/button-settings/button-settings";
import { Logo } from "../components/logo/logo";
import { Settings } from "../components/settings/settings";

export class SettingPage extends Control {

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const settings = new Settings(this.node)
        const buttonSettings = new ButtonSettings(this.node)
    }
}
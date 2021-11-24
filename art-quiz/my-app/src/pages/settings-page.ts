import Control from "../common/control";
import { ButtonSettings } from "../components/button-settings/button-settings";
import { Footer } from "../components/footer/footer";
import { Logo } from "../components/logo/logo";
import { Settings } from "../components/settings/settings";

export class SettingPage extends Control {
    buttonSettings: ButtonSettings;
    settings: Settings;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        this.settings = new Settings(this.node)
        this.buttonSettings = new ButtonSettings(this.node)
        const footer = new Footer(this.node)
        this.buttonSettings.onSave = () => {
            this.setTimeLocalStorage()
        }
        this.buttonSettings.onDefault = () => {
            this.defaultValue()
        }
    }

    setTimeLocalStorage() {
        const time = {
            isTime: this.settings.timeSettings.isChecked,
            timeCount: +this.settings.timeSettings.timeCount.countInput.node.value
        }
        localStorage.setItem('time', JSON.stringify(time))
        console.log(this.settings.volumeSettings.volumeRange.node.value)
        localStorage.setItem('volume', JSON.stringify(this.settings.volumeSettings.volumeRange.node.value))
    }

    defaultValue() {
        localStorage.removeItem('time')
        localStorage.removeItem('volume')
        this.settings.volumeSettings.volumeRange.node.value = '0.5'
        this.settings.volumeSettings.volumeRangeBgd()
        this.settings.timeSettings.timeCount.countButton.node.setAttribute('disabled', 'disabled')
        this.settings.timeSettings.timeCount.countButton.node.style.backgroundColor = '#555555'
        this.settings.timeSettings.timeCount.countButtonPlus.node.setAttribute('disabled', 'disabled')
        this.settings.timeSettings.timeCount.countButtonPlus.node.style.backgroundColor = '#555555'
        this.settings.timeSettings.timeLabel.node.style.backgroundImage = 'none'
        this.settings.timeSettings.timeCount.countInput.node.value = '5'
        this.settings.timeSettings.isChecked = false
        this.settings.timeSettings.timeInput.node.removeAttribute('checked')
    }
}
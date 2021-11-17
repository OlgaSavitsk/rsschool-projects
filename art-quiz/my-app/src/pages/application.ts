import Control from "../common/control";
import { CategoriesCard } from "../components/cards/categories-card";
import { Categories } from "../components/categories/categories";
import { Logo } from "../components/logo/logo";

export class Application extends Control {
   private buttonSettings: Control<HTMLButtonElement>;
   categoryCards!: CategoriesCard

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categories = new Categories(this.node)
        this.buttonSettings = new Control(this.node, 'button', 'settings', '')
        this.buttonSettings.node.innerHTML = `
            <a class="settings link" href="#setting">
            <span class="settings-icon set"></span>settings
            </a>`
    }
}
import Control from "@/common/control";
import SettingsStorage from "@/common/services/settings-storage";

export default class Snowflake extends Control {
    snowflake!: Control<HTMLElement>;
    settings: import("c:/Users/user/Documents/private-repo/olgasavitsk-JSFE2021Q3/christmas-task/src/models/settings-tree.model").ISettingsTree;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'snowflakes', '');
      this.settings = SettingsStorage.getData()
    }

    public renderSnowflake(): void {
        setInterval(() => {
            this.snowflake = new Control(this.node, 'i', 'fas fa-snowflake', '')
            this.snowflake.node.style.left = Math.random() * 800 +'px'
            this.snowflake.node.style.animationDuration = Math.random() * 5 + 5 + 's'
          }, 100)
          setTimeout(() => {
              this.snowflake.destroy()
          }, 5000)
      }
}
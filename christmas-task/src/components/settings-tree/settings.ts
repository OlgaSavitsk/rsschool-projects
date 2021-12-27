import Control from "@/common/control";
import BgContainer from "./bg-container";
import GarlandContainer from "./garland-container";
import TreesContainer from "./trees-container";

export default class SettingsControl extends Control {
    snowAudioContainer: Control<HTMLElement>;
    audioControl: Control<HTMLElement>;
    snowControl: Control<HTMLElement>;
    treesContainer: TreesContainer;
    bgContainer: BgContainer;
    garlandContainer: GarlandContainer;
    onSnowClick: (() => void) | undefined
    onSoundClick: (() => void) | undefined
    onReset: (() => void) | undefined
    buttonReset: Control<HTMLButtonElement>;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'settings', '');
      this.snowAudioContainer = new Control(this.node, 'div', 'snow-audio menu-container', '')
      this.audioControl = new Control(this.snowAudioContainer.node, 'div', 'audio menu-item', '')
      this.snowControl = new Control(this.snowAudioContainer.node, 'div', 'snow menu-item', '')
      this.buttonReset = new Control(this.snowAudioContainer.node, 'button', 'reset', 'Сброс настроек');
      this.treesContainer = new TreesContainer(this.node)
      this.bgContainer = new BgContainer(this.node)
      this.garlandContainer = new GarlandContainer(this.node)
      this.snowControl.node.onclick = () => {
        if(this.onSnowClick){
          this.onSnowClick()
        }
      }
      this.audioControl.node.onclick = () => {
        if(this.onSoundClick){
          this.onSoundClick()
        }
      }
      this.buttonReset.node.onclick = () => {
        if (this.onReset) {
          this.onReset();
        }
      };
    }
}
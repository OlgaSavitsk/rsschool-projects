import Control from '@/common/components/control';
import BgContainer from './bg-container';
import GarlandContainer from './garland-container';
import TreesContainer from './trees-container';

export default class SettingsControl extends Control {
  private snowAudioContainer: Control<HTMLElement>;

  private audioControl: Control<HTMLElement>;

  private snowControl: Control<HTMLElement>;

  public treesContainer: TreesContainer;

  public bgContainer: BgContainer;

  public garlandContainer: GarlandContainer;

  public onSnowClick: (() => void) | undefined;

  public onSoundClick: (() => void) | undefined;

  public onReset: (() => void) | undefined;

  private buttonReset: Control<HTMLButtonElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'settings', '');
    this.snowAudioContainer = new Control(this.node, 'div', 'snow-audio menu-container', '');
    this.audioControl = new Control(this.snowAudioContainer.node, 'div', 'audio menu-item', '');
    this.snowControl = new Control(this.snowAudioContainer.node, 'div', 'snow menu-item', '');
    this.buttonReset = new Control(this.snowAudioContainer.node, 'button', 'reset', 'Сброс настроек');
    this.treesContainer = new TreesContainer(this.node);
    this.bgContainer = new BgContainer(this.node);
    this.garlandContainer = new GarlandContainer(this.node);
    this.setSnowEventListener();
    this.setAudioEventListener();
    this.setResetEventListener();
  }

  private setSnowEventListener(): void {
    this.snowControl.node.onclick = () => {
      if (this.onSnowClick) {
        this.onSnowClick();
      }
    };
  }

  private setAudioEventListener(): void {
    this.audioControl.node.onclick = () => {
      if (this.onSoundClick) {
        this.onSoundClick();
      }
    };
  }

  private setResetEventListener(): void {
    this.buttonReset.node.onclick = () => {
      if (this.onReset) {
        this.onReset();
      }
    };
  }
}

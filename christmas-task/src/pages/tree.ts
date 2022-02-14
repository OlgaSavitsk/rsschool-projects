import Control from '@/common/components/control';
import { settingaTree, STORAGE_FAVOURITE_NAME, STORAGE_SETTINGS_NAME } from '@/common/constants/constants';
import SoundService from '@/common/services/sound.service';
import StorageService from '@/common/services/storage.service';
import Header from '@/components/header-container/header';
import MainTreeContainer from '@/components/main-tree-container/main-tree-container';
import { garlandBtns } from '@/components/settings-tree/garland-btns';
import { ISettingsTree } from '@/models/settings-tree.model';
import ToysDataModel from '@/models/toys-data-model';

export default class TreePage extends Control {
  private model: ToysDataModel;

  public container!: MainTreeContainer;

  public header: Header;

  private isSnow!: boolean;

  private isSound!: boolean;

  private settings: ISettingsTree | undefined;

  private favouriteStorage: StorageService;

  private audio!: SoundService;

  private settingsStorage: StorageService;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    this.audio = new SoundService();
    this.settingsStorage = new StorageService();
    this.settingsStorage.loadFromLocalStorage(STORAGE_SETTINGS_NAME);
    this.favouriteStorage = new StorageService();
    this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
    this.model.build().then(() => {
      this.settingsRender(garlandBtns.yellow);
    });
  }

  private settingsRender(garlandColor?: string): void {
    const data = this.model.getData();
    this.settings = this.settingsStorage.getData();
    const favoriteCount = this.favouriteStorage.getData();
    this.container = new MainTreeContainer(
      this.node,
      favoriteCount,
      data,
      this.settings!.tree,
      this.settings!.bg,
      garlandColor!,
    );
    this.setSettingsAfterLoading();
    this.setSnowEventListener();
    this.setSoundEventListener();
    this.setResetEventListener(garlandColor);
    this.treesHandler();
    this.garlandHandler();
  }

  private setSettingsAfterLoading(): void {
    if (this.settings?.snow) {
      this.isSnow = true;
      this.container.mainBlock.snowflakes.node.classList.remove('hide');
      this.container.mainBlock.snowflakes.renderSnowflake();
    }
    this.container.node.onclick = () => {
      if (this.settings?.sound) {
        this.settings.sound = false;
        this.isSound = true;
        this.audio.playAudio();
      }
    };
  }

  private setSnowEventListener(): void {
    this.container.settingsControl.onSnowClick = () => {
      if (this.isSnow === true) {
        this.isSnow = false;
        this.container.mainBlock.snowflakes.node.classList.add('hide');
      } else {
        this.isSnow = true;
        this.container.mainBlock.snowflakes.node.classList.remove('hide');
        this.container.mainBlock.snowflakes.renderSnowflake();
      }
      this.saveStorageSettings(this.settings!.tree, this.settings!.bg);
    };
  }

  private setSoundEventListener(): void {
    this.container.settingsControl.onSoundClick = () => {
      if (this.isSound === true) {
        this.isSound = false;
        this.audio.pauseAudio();
      } else {
        this.isSound = true;
        this.audio.playAudio();
      }
      this.saveStorageSettings(this.settings!.tree, this.settings!.bg);
    };
  }

  private setResetEventListener(garlandColor: string | undefined): void {
    this.container.settingsControl.onReset = () => {
      this.settings = settingaTree;
      this.settingsStorage.setData(this.settings);
      this.settingsStorage.saveToStorage(STORAGE_SETTINGS_NAME);
      this.settingsStorage.removeStorage(STORAGE_SETTINGS_NAME);
      this.container.destroy();
      this.settingsRender(garlandColor);
    };
  }

  private treesHandler(): void {
    this.container.settingsControl.treesContainer.onChangeTree = (num) => {
      this.saveStorageSettings(num, this.settings!.bg);
      this.container.destroy();
      this.settingsRender();
    };
    this.container.settingsControl.bgContainer.onChangeTree = (bgNum) => {
      this.saveStorageSettings(this.settings!.tree, bgNum);
      this.container.destroy();
      this.settingsRender();
    };
  }

  private garlandHandler(): void {
    this.container.settingsControl.garlandContainer.switchButton.onChecked = (isChecked) => {
      if (isChecked === true) {
        this.container.mainBlock.garland.node.classList.remove('hide');
        this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'auto';
      } else {
        this.container.mainBlock.garland.node.classList.add('hide');
        this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'none';
      }
    };
    this.container.settingsControl.garlandContainer.garlandBtns.onGarlandColor = (garlandColor) => {
      this.container.destroy();
      this.settingsRender(garlandColor);
      this.container.settingsControl.garlandContainer.switchButton.switchInput.node.setAttribute('checked', 'checked');
      this.container.settingsControl.garlandContainer.switchButton.isChecked = true;
      this.container.mainBlock.garland.node.classList.remove('hide');
      this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'auto';
    };
  }

  private renderGarlandColor(): void {
    this.container.settingsControl.garlandContainer.garlandBtns.onGarlandColor = (garlandColor) => {
      this.container.destroy();
      this.container = new MainTreeContainer(
        this.node,
        this.favouriteStorage.getData(),
        this.model.getData(),
        this.settings!.tree,
        this.settings!.bg,
        garlandColor,
      );
      this.container.mainBlock.garland.node.classList.remove('hide');
      this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'auto';
      this.renderGarlandColor();
    };
  }

  private saveStorageSettings(num: string, bgNum: string): void {
    const settingsTree = <ISettingsTree> {
      tree: num,
      bg: bgNum,
      snow: this.isSnow,
      sound: this.isSound,
    };
    this.settingsStorage.setData(settingsTree);
    this.settingsStorage.saveToStorage(STORAGE_SETTINGS_NAME);
  }
}

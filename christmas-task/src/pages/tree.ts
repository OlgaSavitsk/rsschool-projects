import Control from '@/common/control';
import SettingsStorage from '@/common/services/settings-storage';
import SoundService from '@/common/services/sound.service';
import StorageFavorite from '@/common/services/storage-favorite.service';
import Footer from '@/components/footer/footer';
import Header from '@/components/header-container/header';
import MainTreeContainer from '@/components/main-tree-container/main-tree-container';
import { garlandBtns } from '@/components/settings-tree/garland-btns';
import { ISettingsTree, settingaTree } from '@/models/settings-tree.model';
import ToysDataModel from '@/models/toys-data-model';


export default class TreePage extends Control {
  private model: ToysDataModel;
    public container!: MainTreeContainer;
    header: Header;
    isSnow!: boolean
    isSound!: boolean
    isCheckedGarland!: boolean
    settings: ISettingsTree | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    SettingsStorage.loadFromLocalStorage();
    StorageFavorite.loadFromLocalStorage()
    this.model.build().then((result) => {
      this.render(garlandBtns.yellow);
    });
  }

  private render(garlandColor: string): void {
         const data = this.model.getData();
         this.settings = SettingsStorage.getData()
        const favoriteCount = StorageFavorite.getData();
        this.container = new MainTreeContainer(this.node, favoriteCount, data, this.settings!.tree, this.settings!.bg, garlandColor);
        if(this.settings?.snow === true) {
          this.isSnow = true
          this.container.mainBlock.snowflakes.node.classList.remove('hide')
          this.container.mainBlock.snowflakes.renderSnowflake()
      }
        this.container.node.onclick = () => { 
          if(this.settings?.sound === true) {
            this.settings.sound = false
            this.isSound = true
            SoundService.playAudio()
        }
    }  
        this.container.settingsControl.treesContainer.onChangeTree = (num) => {
          this.saveStorageSettings(num, this.settings!.bg)
          this.container.destroy()
          this.render(garlandColor)
        }
        this.container.settingsControl.bgContainer.onChangeTree = (bgNum) => {
          this.saveStorageSettings(this.settings!.tree, bgNum)
          this.container.destroy()
          this.render(garlandColor)
        }
        this.container.settingsControl.onSnowClick = () => {
          if(this.isSnow === true){
            this.isSnow = false
            this.container.mainBlock.snowflakes.node.classList.add('hide')
          } else {
            this.isSnow = true
            this.container.mainBlock.snowflakes.node.classList.remove('hide')
            this.container.mainBlock.snowflakes.renderSnowflake()
          }
          this.saveStorageSettings(this.settings!.tree, this.settings!.bg)
        }
        this.container.settingsControl.garlandContainer.switchButton.onChecked = (isChecked) => {
          if(isChecked === true) {
            this.container.mainBlock.garland.node.classList.remove('hide')
            this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'auto' 
          } else {
            this.container.mainBlock.garland.node.classList.add('hide')
            this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'none'
          }
        }
       
        this.container.settingsControl.onSoundClick = () => {
          if(this.isSound === true){
            this.isSound = false
            SoundService.pauseAudio()
          } else {
            this.isSound = true
            SoundService.playAudio()
          } 
          this.saveStorageSettings(this.settings!.tree, this.settings!.bg)
        }
        this.container.settingsControl.onReset = () => {
          this.settings = settingaTree
          SettingsStorage.setData(this.settings);
          SettingsStorage.removeStorage()
          this.container.destroy();
          this.render(garlandColor)
        };
        this.renderGarlandColor()
    }

    renderGarlandColor() {
      this.container.settingsControl.garlandContainer.garlandBtns.onGarlandColor = (garlandColor) => {  
        this.container.destroy()
        this.container = new MainTreeContainer(this.node, StorageFavorite.getData(), this.model.getData(), this.settings!.tree, this.settings!.bg, garlandColor);
        this.container.mainBlock.garland.node.classList.remove('hide')
        this.container.settingsControl.garlandContainer.garlandBtns.node.style.pointerEvents = 'auto' 
        this.renderGarlandColor()
      }
    }

    saveStorageSettings(num: string, bgNum: string) {
      const settingaTree = <ISettingsTree> {
        tree: num,
        bg: bgNum,
        snow: this.isSnow,
        sound: this.isSound
      }
      SettingsStorage.setData(settingaTree);
    }
}
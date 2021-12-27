import Control from '@/common/control';
import SettingsStorage from '@/common/services/settings-storage';
import SoundService from '@/common/services/sound.service';
import StorageFavorite from '@/common/services/storage-favorite.service';
import Footer from '@/components/footer/footer';
import Header from '@/components/header-container/header';
import MainTreeContainer from '@/components/main-tree-container/main-tree-container';
import { ISettingsTree } from '@/models/settings-tree.model';
import ToysDataModel from '@/models/toys-data-model';


export default class TreePage extends Control {
  private model: ToysDataModel;
    public container!: MainTreeContainer;
    header: Header;
    isSnow!: boolean
    isSound!: boolean
    settings: ISettingsTree | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    SettingsStorage.loadFromLocalStorage();
    StorageFavorite.loadFromLocalStorage()
    this.model.build().then((result) => {
      this.render('1', '1', '');
    });
  }

  private render(num, bgNum, garlandColor): void {
        const data = this.model.getData();
        const favoriteCount = StorageFavorite.getData();
        this.container = new MainTreeContainer(this.node, favoriteCount, data, num, bgNum, garlandColor);
        this.container.settingsControl.treesContainer.onChangeTree = (num) => {
          this.container.destroy()
          this.render(num, bgNum, garlandColor)
        }
        this.container.settingsControl.bgContainer.onChangeTree = (bgNum) => {
          this.container.destroy()
          this.render(num, bgNum, garlandColor)
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
        }
        this.container.settingsControl.onSoundClick = () => {
          if(this.isSound === true){
            this.isSound = false
            SoundService.pauseAudio()
          } else {
            this.isSound = true
            SoundService.playAudio()
          } 
        }
        this.container.settingsControl.garlandContainer.garlandBtns.onGarlandColor = (garlandColor) => {
          this.container.destroy()
          this.render(num, bgNum, garlandColor)
        }
        this.container.node.onclick = () => {
          const settingaTree = {
            tree: num,
            bg: bgNum,
            snow: this.isSnow,
            sound: this.isSound
          }
          SettingsStorage.setData(settingaTree);
        }
    }
}
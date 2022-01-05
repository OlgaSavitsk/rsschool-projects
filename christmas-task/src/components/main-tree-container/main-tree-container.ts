import Control from '@/common/components/control';
import { ILimit } from '@/models/limit';
import { IToysModel } from '@/models/toys-model';
import FavoriteBlock from '../favorite/favoriteBlock';
import MainTree from '../main-tree/main-tree';
import SettingsControl from '../settings-tree/settings';

export default class MainTreeContainer extends Control {
  public settingsControl: SettingsControl;

  public mainBlock!: MainTree;

  public favorite: FavoriteBlock;

  public garlandColor!: string;

  public count!: number;

  constructor(
    parentNode: HTMLElement,
    public favoriteCount: string[],
    public data: IToysModel[],
    num: string,
    bgNum: string,
    garlandColor: string,
  ) {
    super(parentNode, 'div', 'main-container', '');
    this.settingsControl = new SettingsControl(this.node);
    this.mainBlock = new MainTree(this.node, num, bgNum, garlandColor);
    this.favorite = new FavoriteBlock(
      this.node,
      favoriteCount,
      data,
      this.count,
      this.getMainTreeSize(),
    );
    this.mainBlock.imgOfTree.node.ondragover = (e) => {
      this.dragOver(e);
    };
    this.mainBlock.area.node.ondrop = (e) => {
      this.drop(e);
      this.count = this.favoriteCount.length - 1;
    };
  }

  private dragOver(e: DragEvent): void {
    e.preventDefault();
  }

  private drop(e: DragEvent): void {
    if (e.dataTransfer) {
      const id = e.dataTransfer.getData('text');
      const draggableElement = document.getElementById(id);
      this.mainBlock.area.node.appendChild(draggableElement!);
      e.dataTransfer.clearData();
    }
  }

  public getMainTreeSize(): ILimit {
    const limit = <ILimit> {
      left: this.mainBlock.imgOfTree.node
        .getBoundingClientRect().left - this.mainBlock.imgOfTree.node.offsetWidth / 2,
      top: this.mainBlock.imgOfTree.node.getBoundingClientRect().top,
      right: this.mainBlock.imgOfTree.node
        .getBoundingClientRect().right - this.mainBlock.imgOfTree.node.offsetWidth / 2,
      bottom: this.mainBlock.imgOfTree.node.getBoundingClientRect().bottom,
    };
    return limit;
  }
}

import Control from '@/common/components/control';
import { ILimit } from '@/models/limit';

interface IDefaultPosition {
  left: string,
  top: string
}

const old: IDefaultPosition = {
  left: '',
  top: '',
};

export default class SlotImage extends Control {
  private topIndent = 0;

  private leftIndent = 0;

  private offsetX!: number;

  private offsetY!: number;

  constructor(parentNode: HTMLElement, public num: string, index: number, public limit?: ILimit) {
    super(parentNode, 'img', 'favorites-card-img', '');
    this.node.setAttribute('src', `./toys/${num}.png`);
    this.node.setAttribute('draggable', 'true');
    this.node.setAttribute('id', `${index + num}`);
    this.node.ondragstart = (e) => {
      this.dragStart(e);
      this.getCoords(e);
    };
    this.node.ondragend = (e) => {
      this.dragEnd(e);
      this.returnToStart();
    };
  }

  private dragStart(e: DragEvent): void {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text', this.node.id);
    }
  }

  private getCoords(e: DragEvent): void {
    const old: IDefaultPosition = {
      left: this.node.offsetLeft.toString(),
      top: this.node.offsetTop.toString(),
    };
    this.offsetX = e.offsetX;
    this.offsetY = e.offsetY;
  }

  private dragEnd(e: DragEvent): void {
    this.node.style.left = `${e.pageX - this.offsetX}px`;
    this.node.style.top = `${e.pageY - this.offsetY}px`;
  }

  public moveAt(e: { pageX: number; pageY: number; }): void {
    this.node.style.left = `${e.pageX - this.leftIndent}px`;
    this.node.style.top = `${e.pageY - this.topIndent}px`;
  }

  public returnToStart(): void {
    if (this.node.getBoundingClientRect().left <= this.limit!.left) {
      this.node.style.left = old.left;
      this.node.style.top = old.top;
      this.node.setAttribute('dissabled', 'true');
    }
    if (this.node.getBoundingClientRect().right >= this.limit!.right) {
      this.node.style.left = old.left;
      this.node.style.top = old.top;
      this.node.setAttribute('dissabled', 'true');
    }
  }
}

import Control from '@/common/components/control';
import { ILimit } from '@/models/limit';
import { IToysModel } from '@/models/toys-model';
import SlotImage from './slotImage';

export default class FavoriteCard extends Control {
  public favoriteCount!: Control<HTMLElement>;

  public slotImage!: SlotImage;

  private slotImageArr!: IToysModel[];

  private slotCount: number;

  constructor(
    parentNode: HTMLElement,
    public slotItem: IToysModel,
    public count: number,
    public limit: ILimit,
  ) {
    super(parentNode, 'div', 'favorites-card', '');
    if (count) {
      this.slotCount = count;
    } else this.slotCount = +slotItem.count;
    this.favoriteCount = new Control(this.node, 'p', 'favorites-count', `${this.slotCount}`);
    this.rendedSlotImage();
  }

  private rendedSlotImage(): void {
    this.slotImageArr = new Array(+this.slotItem.count);
    this.slotImageArr.fill(this.slotItem);
    this.slotImageArr.map((toy: IToysModel, index: number) => {
      this.slotImage = new SlotImage(this.node, toy.num, index, this.limit);
      return false;
    });
  }
}

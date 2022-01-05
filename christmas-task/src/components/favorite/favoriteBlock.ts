import Control from '@/common/components/control';
import { ILimit } from '@/models/limit';
import { IToysModel } from '@/models/toys-model';
import FavoriteCard from './favorite-card';

export default class FavoriteBlock extends Control {
  public favoriteContainer: Control<HTMLElement>;

  public favoriteSlot!: FavoriteCard;

  constructor(
    parentNode: HTMLElement,
    public favoriteCount: string[],
    public data: IToysModel[],
    public count:number,
    public limit: ILimit,
  ) {
    super(parentNode, 'div', 'favorites-aside', '');
    this.favoriteContainer = new Control(this.node, 'div', 'favorites-container', '');
    this.renderSlot();
  }

  private renderSlot(): void {
    this.favoriteCount.map((slot: string) => {
      const slotItem = Object.values<IToysModel>(this.data)
        .find((item: IToysModel) => item.num === slot);
      if (slotItem) {
        this.favoriteSlot = new FavoriteCard(
          this.favoriteContainer.node,
          slotItem,
          this.count,
          this.limit,
        );
      }
      return false;
    });
    if (this.favoriteCount.length === 0) {
      this.data.slice(0, 20).map((item) => {
        this.favoriteSlot = new FavoriteCard(
          this.favoriteContainer.node,
          item,
          this.count,
          this.limit,
        );
        return false;
      });
    }
  }
}

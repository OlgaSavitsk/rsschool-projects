//import { getLocalStorageData } from '../..';
import Control from '@/common/control';
import { IToysModel } from '@/models/toys-model';
import ModalError from '../modal-error/modal-error';
import Card from './card';
import StorageFavorite from '@/common/services/storage-favorite.service';

export default class CardContainer extends Control {
  public card!: Card;

  private favoriteSet!: Set<string>;

  public modal!: ModalError;

  constructor(parentNode: HTMLElement, public data: IToysModel[]) {
    super(parentNode, 'div', 'card-container', '');
    StorageFavorite.loadFromLocalStorage()
    this.data.map((toy: IToysModel) => {
      this.card = new Card(this.node, toy);
      this.card.favoriteSelect = () => {
        const favoriteCount = StorageFavorite.getData();
        this.favoriteSet = new Set(favoriteCount);
        this.favoriteSet.add(toy.num);
        const del = favoriteCount.find((item: string) => item === toy.num);
        this.favoriteSet.delete(del!);
        if (favoriteCount.length === 20 && toy.num !== del) {
          this.modal = new ModalError(this.node, 'Извините, все слоты заполнены');
          this.favoriteSet.delete(toy.num);
        }
        this.card.node.classList.remove('active');
        StorageFavorite.setData([...this.favoriteSet])
      };
    });
  }
}

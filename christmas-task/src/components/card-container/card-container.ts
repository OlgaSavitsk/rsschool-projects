import { IToysModel } from '@/models/toys-model';
import ModalError from '../modal-error/modal-error';
import Card from './card';
import Control from '@/common/components/control';
import { FAVORITE_ERROR_MESSAGE, MAX_FAVOURITE_COUNT, STORAGE_FAVOURITE_NAME } from '@/common/constants/constants';
import StorageService from '@/common/services/storage.service';

export default class CardContainer extends Control {
  public card!: Card;

  private favoriteSet!: Set<string>;

  public modal!: ModalError;

  private favouriteStorage: StorageService;

  constructor(parentNode: HTMLElement, public data: IToysModel[]) {
    super(parentNode, 'div', 'card-container', '');
    this.favouriteStorage = new StorageService();
    this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
    this.renderCard();
  }

  private renderCard(): void {
    this.data.map((toy: IToysModel) => {
      this.card = new Card(this.node, toy);
      this.addToFavoriteCard(toy);
      return false;
    });
  }

  private addToFavoriteCard(toy: IToysModel): void {
    this.card.favoriteSelect = () => {
      const favoriteCount = this.favouriteStorage.getData();
      this.favoriteSet = new Set(favoriteCount);
      this.favoriteSet.add(toy.num);
      this.deleteFromFavouriteCard(favoriteCount, toy);
      this.favouriteStorage.setData([...this.favoriteSet]);
      this.favouriteStorage.saveToStorage(STORAGE_FAVOURITE_NAME);
    };
  }

  private deleteFromFavouriteCard(favoriteCount: string[], toy: IToysModel): void {
    const del = favoriteCount.find((item: string) => item === toy.num);
    this.favoriteSet.delete(del!);
    if (favoriteCount.length === MAX_FAVOURITE_COUNT && toy.num !== del) {
      this.modal = new ModalError(this.node, FAVORITE_ERROR_MESSAGE);
      this.favoriteSet.delete(toy.num);
    }
    this.card.node.classList.remove('active');
  }
}

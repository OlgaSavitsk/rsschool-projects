import Control from '@/common/components/control';
import { STORAGE_FAVOURITE_NAME } from '@/common/constants/constants';
import StorageFavorite from '@/common/services/storage.service';

export default class FavoriteCounter extends Control {
  public favouriteStorage!: StorageFavorite;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite', '');
    this.favouriteStorage = new StorageFavorite();
    this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
    this.node.innerHTML = `<span>${this.addToCart()}</span>`;
  }

  public addToCart(): number {
    const favoriteCount = this.favouriteStorage.getData();
    return favoriteCount.length;
  }
}

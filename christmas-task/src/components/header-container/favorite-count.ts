import Control from '@/common/components/control';
import StorageFavorite from '@/common/services/storage-favorite.service';

export default class FavoriteCounter extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite', '');
    this.node.innerHTML = `<span>${this.addToCart()}</span>`;
  }

  private addToCart(): number {
    StorageFavorite.loadFromLocalStorage();
    const favoriteCount = StorageFavorite.getData();
    return favoriteCount.length;
  }
}

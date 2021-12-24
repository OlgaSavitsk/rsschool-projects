import Control from '@/common/control';
import StorageFavorite from '@/common/services/storage-favorite.service';

export default class Favorite extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite', '');
    this.node.innerHTML = `<span>${this.addToCart()}</span>`;
  }

  addToCart() {
    StorageFavorite.loadFromLocalStorage()
    const favoriteCount = StorageFavorite.getData();
    return favoriteCount.length;
  }
}

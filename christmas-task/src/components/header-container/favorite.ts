import Control from '../../common/control';

export default class Favorite extends Control {
  countFavotite: number = 0

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite', '');
    this.node.innerHTML = `<span>${this.addToCart()}</span>`
  }

  addToCart() {
    const favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
    return favoriteCount.length
  }
}
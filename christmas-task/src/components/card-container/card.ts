import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import Ribbon from './ribbon';

export default class Card extends Control {
  description: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, toy: IToysModel) {
    super(parentNode, 'div', 'card', '');
    this.node.innerHTML = `<h2 class="card-title">${toy.name}</h2>
        <img class="card-img" src="./assets/toys/${toy.num}.png" alt="toy">`
    this.description = new Control(this.node, 'div', 'card-description', '')
    this.description.node.innerHTML = `
        <p class="count">Количество:</span>${toy.count}</span></p>
        <p>Год покупки:<span>${toy.year}</span></p>
        <p>Форма:<span>${toy.shape}</span></p>
        <p>Цвет:<span>${toy.color}</span></p>
        <p>Размер:<span>${toy.size}</span></p>
        <p>Любимая:<span>${toy.favorite}</span></p>`
        const ribbon = new Ribbon(this.node)
  }
}
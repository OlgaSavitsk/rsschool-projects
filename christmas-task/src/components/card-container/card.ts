import { getLocalStorageData } from '../..';
import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import Ribbon from './ribbon';

export default class Card extends Control {
  description: Control<HTMLElement>;
  favoriteSelect!: () => void;

  constructor(parentNode: HTMLElement, toy: IToysModel) {
    super(parentNode, 'div', 'card', '');
    this.node.setAttribute('data-num', `${toy.num}`)
    this.node.innerHTML = `<h2 class="card-title">${toy.name}</h2>
        <img class="card-img" src="./assets/toys/${toy.num}.png" alt="toy">`
    this.description = new Control(this.node, 'div', 'card-description', '')
    const ribbon = new Ribbon(this.node)  
    this.node.onclick = () => {
      if(this.node.classList.contains('active')) {
        this.node.classList.remove('active') 
      } else {
        this.node.classList.add('active')
        this.removeStyle()
      }
      this.favoriteSelect()
    }
    this.render(toy)
    this.setCardStyle()
  }

  private setCardStyle(): void {
    getLocalStorageData()
    .map((item: string | null) => {
      if(this.node.getAttribute('data-num') === item) {
        this.node.classList.add('active')
      }
    })
  }

  public removeStyle(): void {
    if(getLocalStorageData().length === 20) {
      this.node.classList.remove('active')
    } 
  }

  public render(toy: IToysModel): void {
   this.description.node.innerHTML = `<p class="count">Количество:</span>${toy.count}</span></p>
   <p>Год покупки:<span>${toy.year}</span></p>
   <p>Форма:<span>${toy.shape}</span></p>
   <p>Цвет:<span>${toy.color}</span></p>
   <p>Размер:<span>${toy.size}</span></p>
   <p>Любимая:<span>${toy.favorite}</span></p>`
  }
}
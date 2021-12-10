import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import Card from './card';

export default class CardContainer extends Control {
    card!: Card;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'card-container', '');
    this.setToys()
  }

  async getData(): Promise<IToysModel[]> {
    const response = await fetch('toys.json');
    const toys: Array<IToysModel> = await response.json();
    return toys;
  }

  setToys() {
    this.getData().then(res => {
      res.map(toy => this.card = new Card(this.node, toy)) 
    })
  }
}
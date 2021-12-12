import { getLocalStorageDate } from '../..';
import Control from '../../common/control';
import delay from '../../common/delay';
import { IToysModel } from '../../models/toys-model';
import Favorite from '../header-container/favorite';
import HeaderControls from '../header-container/header-controls';
import ModalError from '../modal-error/modal-error';
import Card from './card';

export default class CardContainer extends Control {
    card!: Card;
    favorite!: Favorite
    headerControls!: HeaderControls
    favoriteSet!: Set<string>;
    isFavorite: boolean = false;
    modal!: ModalError;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'card-container', '');
    this.setToyCards()
  }

  async getData(): Promise<IToysModel[]> {
    const response = await fetch('toys.json');
    const toys: Array<IToysModel> = await response.json();
    return toys;
  }

  setToyCards() {
    this.getData().then(res => {
      res.map((toy) => {
        this.card = new Card(this.node, toy)
        this.card.favoriteSelect = async() => {
          const favoriteCount = getLocalStorageDate()
          this.favoriteSet = new Set(favoriteCount)
          this.favoriteSet.add(toy.num)   
          let del = favoriteCount.find(item => item === toy.num)
          this.favoriteSet.delete(del!)
          if(favoriteCount.length === 20 && toy.num !== del) {
            this.modal = new ModalError(this.node)
            this.favoriteSet.delete(toy.num)
          } 
          this.card.node.classList.remove('active')
          localStorage.setItem('favorite', JSON.stringify([...this.favoriteSet]));
        } 
      })
    })
  }
}
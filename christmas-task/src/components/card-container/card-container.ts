import { getLocalStorageData } from '../..';
import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import ModalError from '../modal-error/modal-error';
import Card from './card';

export default class CardContainer extends Control {
    card!: Card;
    favoriteSet!: Set<string>;
    modal!: ModalError;
    data: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'card-container', ''); 
    this.data = data
    this.data.map((toy: IToysModel) => {
      this.card = new Card(this.node, toy)
      this.card.favoriteSelect = () => {
        const favoriteCount = getLocalStorageData()
        this.favoriteSet = new Set(favoriteCount)
        this.favoriteSet.add(toy.num)   
        let del = favoriteCount.find((item: string) => item === toy.num)
        this.favoriteSet.delete(del!)
        if(favoriteCount.length === 20 && toy.num !== del) {
          this.modal = new ModalError(this.node)
          this.favoriteSet.delete(toy.num)
        } 
        this.card.node.classList.remove('active')
        localStorage.setItem('favorite', JSON.stringify([...this.favoriteSet]));
      } 
    }) 
  }
}
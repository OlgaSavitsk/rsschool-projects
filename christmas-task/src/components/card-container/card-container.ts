import { getLocalStorageData } from '../..';
import Control from '../../common/control';
import SortService from '../../common/services/sort.service';
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
    sortService!: SortService
    data: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'card-container', ''); 
    this.data = data
    this.data.map((toy: IToysModel) => {
      this.card = new Card(this.node, toy)
      this.card.favoriteSelect = async() => {
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

  /* setToyCards(values) {
    values.map((toy) => {
        this.card = new Card(this.node, toy)
        this.card.favoriteSelect = async() => {
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
  } */
}
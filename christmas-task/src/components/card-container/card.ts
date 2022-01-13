import { Control } from '@/common/components/control';
import { STORAGE_FAVOURITE_NAME } from '@/common/constants/constants';
import StorageService from '@/common/services/storage.service';
import { IToysModel } from '@/models/toys-model';

export default class Card extends Control {
  public description: Control<HTMLElement>;

  public favoriteSelect!: () => void;

  private favouriteStorage!: StorageService;

  readonly ribbon: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, toy: IToysModel) {
    super(parentNode, 'div', 'card', '');
    this.node.setAttribute('data-num', `${toy.num}`);
    this.node.innerHTML = `<h2 class="card-title">${toy.name}</h2>
        <img class="card-img" src="./toys/${toy.num}.png" alt="toy">`;
    this.description = new Control(this.node, 'div', 'card-description', '');
    this.ribbon = new Control(this.node, 'div', 'ribbon', '');
    this.setEventListener();
    this.render(toy);
    this.setCardStyle();
  }

  private setCardStyle(): void {
    this.favouriteStorage = new StorageService();
    this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
    this.favouriteStorage.getData()
      .map((item: string | null) => {
        if (this.node.getAttribute('data-num') === item) {
          this.node.classList.add('active');
        }
        return false;
      });
  }

  private removeStyle(): void {
    if (this.favouriteStorage.getData().length === 20) {
      this.node.classList.remove('active');
    }
  }

  private setEventListener(): void {
    this.node.onclick = () => {
      if (this.node.classList.contains('active')) {
        this.node.classList.remove('active');
      } else {
        this.node.classList.add('active');
        this.removeStyle();
      }
      this.favoriteSelect();
    };
  }

  public render(toy: IToysModel): void {
    this.description.node.innerHTML = `<p class="count">Количество:</span>${toy.count}</span></p>
   <p>Год покупки:<span>${toy.year}</span></p>
   <p>Форма:<span>${toy.shape}</span></p>
   <p>Цвет:<span>${toy.color}</span></p>
   <p>Размер:<span>${toy.size}</span></p>
   <p>Любимая:<span>${toy.favorite}</span></p>`;
  }
}

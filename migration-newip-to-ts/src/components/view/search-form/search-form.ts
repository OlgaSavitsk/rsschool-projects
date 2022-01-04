import AppController from '@/controller/controller';
import { IResponseEverythingModel } from '../models/response-everything-model';

export default class SearchForm extends AppController {
  public getSearch(callback: ((data: IResponseEverythingModel) => void) | undefined) {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    const searchButton = document.querySelector('.search-button')!;
    searchButton.addEventListener('click', (e: Event) => {
      e.preventDefault();
      super.getRespSearch(
        {
          endpoint: 'everything',
          options: {
            q: searchInput!.value,
          },
        },
        callback,
      );
    });
  }
}

import { ISource } from '../models/response-sources-model';
import './sources.css';

class Sources {
  static draw(data: ISource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item: ISource) => {
      const sourceClone = (<HTMLTemplateElement>sourceItemTemp).content.cloneNode(true);

      (<HTMLElement>sourceClone).querySelector('.source__item-name')!.textContent = item.name;
      (<HTMLElement>sourceClone).querySelector('.source__item')!.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment);
  }
}

export default Sources;

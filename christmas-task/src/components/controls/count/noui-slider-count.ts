import noUiSlider from 'nouislider';
import Control from '../../../common/control';
import { IDefaultFilters } from '../../main-toys-container/main-toys-container';

export class NoUiSliderCount extends Control {
    node!: noUiSlider.Instance;
    onChange!: () => void
    onSort!: () => void

    constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
        super(parentNode, 'div', 'filter-slider', '');
        noUiSlider.create(this.node, {
            start: [+filterStorage.count[0], +filterStorage.count[1]],
            connect: true,
            range: {
                'min': 1,
                'max': 12
            }
        });
    }
}
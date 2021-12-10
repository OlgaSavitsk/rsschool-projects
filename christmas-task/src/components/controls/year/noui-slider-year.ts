import noUiSlider from 'nouislider';
import Control from '../../../common/control';

export class NoUiSliderYear extends Control {
    node!: noUiSlider.Instance;
    onChange!: () => void
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'filter-slider', '');
        noUiSlider.create(this.node, {
            start: [0, 2020],
            connect: true,
            range: {
                'min': 1940,
                'max': 2020
            }
        });
        this.node.onclick = () => {
            this.onChange()
        }
    }
}
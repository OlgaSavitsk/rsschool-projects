import noUiSlider from 'nouislider';
import Control from '../../../common/control';

export class NoUiSliderCount extends Control {
    node!: noUiSlider.Instance;
    onChange!: () => void
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'filter-slider', '');
        noUiSlider.create(this.node, {
            start: [0, 12],
            connect: true,
            range: {
                'min': 1,
                'max': 12
            }
        });
        this.node.onclick = () => {
            this.onChange()
        }
    }
}
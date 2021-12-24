import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import NoUiSliderYear from './noui-slider-year';

export default class YearSlider extends Control {
  outputStart: Control<HTMLOutputElement>;

  outputEnd: Control<HTMLOutputElement>;

  slider: NoUiSliderYear;

  onChange!: (startValue: string, endValue: string) => void;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'count-slider', '');
    this.outputStart = new Control(this.node, 'output', 'slider-output', '');
    this.slider = new NoUiSliderYear(this.node, filterStorage);
    this.outputEnd = new Control(this.node, 'output', 'slider-output', '');
    this.outputStart.node.value = this.filterStorage.year[0].toString();
    this.outputEnd.node.value = this.filterStorage.year[1].toString();
    const snapValues = [
      this.outputStart.node,
      this.outputEnd.node,
    ];
    this.node.onclick = () => {
      this.slider.node.noUiSlider.on('update', (values, handle) => {
        snapValues[handle].value = Math.floor(values[handle]).toString();
        snapValues[handle].value = Math.floor(values[handle]).toString();
      });
      this.onChange(this.outputStart.node.value, this.outputEnd.node.value);
    };
  }
}

import Control from '../../../common/control';
import { IToysModel } from '../../../models/toys-model';
import { IDefaultFilters } from '../../main-toys-container/main-toys-container';
import { NoUiSliderYear } from './noui-slider-year';

export default class YearSlider extends Control {
  outputStart: Control<HTMLOutputElement>;
  outputEnd: Control<HTMLOutputElement>;
    slider: NoUiSliderYear;
    onChange!: (startValue: string, endValue) => void
  filterStorage: IDefaultFilters;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'count-slider', '');
    this.filterStorage = filterStorage
    this.outputStart = new Control(this.node, 'output', 'slider-output', '')
    this.slider = new NoUiSliderYear(this.node, filterStorage)
    this.outputEnd = new Control(this.node, 'output', 'slider-output', '')
    console.log(this.filterStorage)
    this.outputStart.node.value = this.filterStorage.year[0].toString()
    this.outputEnd.node.value = this.filterStorage.year[1].toString()
    //this.outputStart.node.value = Math.floor(this.slider.node.noUiSlider.get()[0]).toString()
    //this.outputEnd.node.value = Math.floor(this.slider.node.noUiSlider.get()[1]).toString()
    const snapValues = [
      this.outputStart.node,
      this.outputEnd.node
  ];
  this.node.onclick = () => {
    this.slider.node.noUiSlider.on('update',  (values, handle) => {
      snapValues[handle].value = Math.floor(values[handle]).toString();
      snapValues[handle].value = Math.floor(values[handle]).toString();
    })
    this.onChange(this.outputStart.node.value, this.outputEnd.node.value)
  }
  }
}
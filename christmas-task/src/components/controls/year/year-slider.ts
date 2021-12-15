import Control from '../../../common/control';
import { IToysModel } from '../../../models/toys-model';
import { NoUiSliderYear } from './noui-slider-year';

export default class YearSlider extends Control {
  outputStart: Control<HTMLOutputElement>;
  outputEnd: Control<HTMLOutputElement>;
    slider: NoUiSliderYear;
    onChange!: () => void

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'count-slider', '');
    this.outputStart = new Control(this.node, 'output', 'slider-output', '')
    this.slider = new NoUiSliderYear(this.node)
    this.outputEnd = new Control(this.node, 'output', 'slider-output', '')
    this.outputStart.node.value = Math.floor(this.slider.node.noUiSlider.get()[0]).toString()
    this.outputEnd.node.value = Math.floor(this.slider.node.noUiSlider.get()[1]).toString()
    const snapValues = [
      this.outputStart.node,
      this.outputEnd.node
  ];
  this.node.onclick = () => {
    this.slider.node.noUiSlider.on('update',  (values, handle) => {
      snapValues[handle].value = Math.floor(values[handle]).toString();
      snapValues[handle].value = Math.floor(values[handle]).toString();
    })
    this.onChange()
  }
  }

  rangeSortByYear(value: IToysModel[]): IToysModel[] {
    const sorted = value.filter(item => {
        return +item.year >= +this.outputStart.node.value && +item.year <= +this.outputEnd.node.value
      })
    return sorted
  } 
}
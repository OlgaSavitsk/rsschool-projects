import Control from '../../../common/control';
import { IToysModel } from '../../../models/toys-model';
import { IDefaultFilters } from '../../main-toys-container/main-toys-container';
import { NoUiSliderCount } from './noui-slider-count';

export default class CountSlider extends Control {
  slider: NoUiSliderCount;
  outputStart: Control<HTMLOutputElement>;
  outputEnd: Control<HTMLOutputElement>;
  onChange!: (startValue: string, endValue) => void

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'count-slider', '');
    this.outputStart = new Control(this.node, 'output', 'slider-output', '')
    this.slider = new NoUiSliderCount(this.node, filterStorage)
    this.outputEnd = new Control(this.node, 'output', 'slider-output', '')
    this.outputStart.node.value = filterStorage.count[0].toString()
    this.outputEnd.node.value = filterStorage.count[1].toString()
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
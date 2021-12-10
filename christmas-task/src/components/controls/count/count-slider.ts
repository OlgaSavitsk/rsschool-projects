import Control from '../../../common/control';
import { NoUiSliderCount } from './noui-slider-count';

export default class CountSlider extends Control {
  slider: NoUiSliderCount;
  outputStart: Control<HTMLOutputElement>;
  outputEnd: Control<HTMLOutputElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'count-slider', '');
    this.outputStart = new Control(this.node, 'output', 'slider-output', '')
    this.slider = new NoUiSliderCount(this.node)
    this.outputEnd = new Control(this.node, 'output', 'slider-output', '')
    this.outputStart.node.value = Math.floor(this.slider.node.noUiSlider.get()[0]).toString()
    this.outputEnd.node.value = Math.floor(this.slider.node.noUiSlider.get()[1]).toString()
    const snapValues = [
      this.outputStart.node,
      this.outputEnd.node
  ];
    this.slider.onChange = () => {
      this.slider.node.noUiSlider.on('update',  (values, handle) => {
        snapValues[handle].value = Math.floor(values[handle]).toString();
        snapValues[handle].value = Math.floor(values[handle]).toString();
      })
    }
  }
}
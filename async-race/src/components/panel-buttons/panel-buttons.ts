import Control from '@/common/components/control';

export default class PanelButtons extends Control {
  public raceButton: Control<HTMLElement>;
  public resetButton: Control<HTMLElement>;
  public ganerateButton: Control<HTMLElement>;
  onGenerateRandomCars!: () => void

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'panel-container', '');
    this.raceButton = new Control(this.node, 'button', 'button', 'RACE');
    this.resetButton = new Control(this.node, 'button', 'button', 'RESET');
    this.ganerateButton = new Control(this.node, 'button', 'button button-ganerate', 'GENERATE CARS');
    this.ganerateButton.node.onclick = () => {
      this.onGenerateRandomCars()
    }
  }
}
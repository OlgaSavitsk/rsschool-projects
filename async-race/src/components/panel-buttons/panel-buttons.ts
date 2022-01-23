import Control from '@/common/components/control';

export default class PanelButtons extends Control {
  public raceButton: Control<HTMLButtonElement>;

  public resetButton: Control<HTMLButtonElement>;

  public ganerateButton: Control<HTMLButtonElement>;

  public onGenerateRandomCars!: () => void;

  public onRace!: () => void;

  public onReset!: () => void;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'panel-container', '');
    this.raceButton = new Control(this.node, 'button', 'button', 'RACE');
    this.resetButton = new Control(this.node, 'button', 'button', 'RESET');
    this.resetButton.node.disabled = true;
    this.ganerateButton = new Control(this.node, 'button', 'button button-ganerate', 'GENERATE CARS');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.ganerateButton.node.onclick = () => {
      this.onGenerateRandomCars();
    };
    this.raceButton.node.onclick = () => {
      this.onRace();
    };
    this.resetButton.node.onclick = () => {
      this.onReset();
    };
  }
}

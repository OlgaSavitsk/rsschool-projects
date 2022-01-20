import Control from '@/common/components/control';
import { IWinnerData } from '@/models/winner-model';
import Table from './table';

export default class MainWinnerContainer extends Control {
  private winnersTitle: Control<HTMLElement>;
  private winnersSubtitle: any;
  table: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, public data: IWinnerData, public winnerPage: string) {
    super(parentNode, 'div', 'main-container', '');
    this.winnersTitle = new Control(this.node, 'h2', 'title', `WINNERS (${data.count})`);
    this.winnersSubtitle = new Control(this.node, 'h3', 'subtitle', `PAGE #${winnerPage}`);
    this.table = new Table(this.node, data)
  }
}
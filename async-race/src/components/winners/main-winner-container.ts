import ApiWinner from '@/api/api-winners';
import Control from '@/common/components/control';
import { IWinnerData } from '@/models/winner-model';
import WinnerTable from './table';

export default class MainWinnerContainer extends Control {
  private winnersTitle: Control<HTMLElement>;
  private winnersSubtitle: any;
  public winnerTable: WinnerTable;

  constructor(parentNode: HTMLElement, public data: IWinnerData, public winnerPage: number) {
    super(parentNode, 'div', 'main-container', '');
    this.winnersTitle = new Control(this.node, 'h2', 'title', `WINNERS (${data.count})`);
    this.winnersSubtitle = new Control(this.node, 'h3', 'subtitle', `PAGE #${winnerPage}`);
    this.winnerTable = new WinnerTable(this.node, data)
  }
}
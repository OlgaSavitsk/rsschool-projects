import ApiWinner from "@/api/api-winners";
import Control from "@/common/components/control";
import { state } from "@/common/state";
import PaginationButtons from "@/components/pagination/pagination-buttons";
import RouterButtons from "@/components/router-buttons/router-buttons";
import MainWinnerContainer from "@/components/winners/main-winner-container";

export default class WinnerPage extends Control {
  public mainWinnerContainer!: MainWinnerContainer;
  private winnersApi: ApiWinner;
  public paginationButtons!: PaginationButtons;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const header = new RouterButtons(this.node) 
    this.winnersApi = new ApiWinner();
    this.winnersRender();
  }

  private async winnersRender(): Promise<void> {
    const data = await this.winnersApi.getWinners({page: state.winnersPage, sort: state.sortBy, order: state.sortOrder});
    this.mainWinnerContainer = new MainWinnerContainer(this.node, data, state.winnersPage)
    this.paginationButtons = new PaginationButtons(this.node) 
    this.paginarion()
    this.sort()
  }

  private paginarion(): void {
    this.paginationButtons.onNextPage = () => {
      state.winnersPage = state.winnersPage + 1
      this.rerenderWinnerContainer()
    }
    this.paginationButtons.onPrevPage = () => {
      console.log('next')
      state.winnersPage = state.winnersPage - 1
      this.rerenderWinnerContainer()
    }
  }

  private sort(): void {
    this.mainWinnerContainer.winnerTable.onSort = (name) => {
      if(name === 'wins' || name === 'time') {
        state.sortBy = name
        if (state.sortOrder === 'ASC') {
          state.sortOrder = 'DESC'
        } else state.sortOrder = 'ASC'
       this.rerenderWinnerContainer()
      }
    }
  }

  private rerenderWinnerContainer(): void {
    this.mainWinnerContainer.destroy()
    this.paginationButtons.destroy()
    this.winnersRender()
  }
}

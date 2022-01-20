import ApiWinnersServer from "@/api/api-winners";
import Control from "@/common/components/control";
import { state } from "@/common/state";
import PaginationButtons from "@/components/pagination/pagination-buttons";
import RouterButtons from "@/components/router-buttons/router-buttons";
import MainWinnerContainer from "@/components/winners/main-winner-container";

export default class WinnerPage extends Control {
  public mainWinnerContainer!: MainWinnerContainer;
  private winnersApi: ApiWinnersServer;
  public paginationButtons!: PaginationButtons;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const header = new RouterButtons(this.node) 
    this.winnersApi = new ApiWinnersServer();
    this.winnersRender();
  }

  private async winnersRender(): Promise<void> {
    const data = await this.winnersApi.getWinners({page: state.winnersPage});
    this.mainWinnerContainer = new MainWinnerContainer(this.node, data, state.winnersPage)
    this.paginationButtons = new PaginationButtons(this.node) 
    this.paginarion()
  }

  paginarion() {
    this.paginationButtons.onNextPage = () => {
      state.winnersPage = (+state.winnersPage + 1).toString()
      this.mainWinnerContainer.destroy()
      this.paginationButtons.destroy()
        this.winnersRender()
    }
    this.paginationButtons.onPrevPage = () => {
      console.log('next')
      state.winnersPage = (+state.winnersPage - 1).toString()
      this.mainWinnerContainer.destroy()
      this.paginationButtons.destroy()
        this.winnersRender()
    }
  }
}

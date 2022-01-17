import ApiWinnersServer from "@/common/api/api-winnwrs";
import Control from "@/common/components/control";
import Footer from "@/components/footer/footer";
import RouterButtons from "@/components/router-buttons/router-buttons";
import MainWinnerContainer from "@/components/winners/main-winner-container";
import ToysDataModel from "@/models/toys-data-model";

export default class WinnerPage extends Control {
  public mainWinnerContainer!: MainWinnerContainer;
  private winnersApi: ApiWinnersServer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const header = new RouterButtons(this.node) 
    this.winnersApi = new ApiWinnersServer();
    this.winnersRender();
  }

  private async winnersRender(): Promise<void> {
    const data = await this.winnersApi.getWinners();
    this.mainWinnerContainer = new MainWinnerContainer(this.node, data)
    const footer = new Footer(this.node);
  }
}

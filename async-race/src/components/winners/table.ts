import Control from "@/common/components/control";
import { cell } from "@/common/constants/constants";
import { IWinnerData } from "@/models/winner-model";

export default class WinnerTable extends Control {
  private thead: Control<HTMLElement>;
  private tbody: Control<HTMLElement>;
  private row!: Control<HTMLElement>;
  public cell!: Control<HTMLElement>;
  public onSort!: (name: string) => void
  
    constructor(parentNode: HTMLElement, public data: IWinnerData) {
      super(parentNode, 'table', 'table', '');
      this.thead = new Control(this.node, 'thead', '', '')
      this.tbody = new Control(this.node, 'tbody', '', '')   
      this.renderCell()
      this.renderRow()
    }

    private renderCell(): void {
        Object.values(cell).map((name) => {
             this.cell = new Control(this.thead.node, 'th', '', `${name}`)
             this.cell.node.setAttribute('data-table', `${name}`)
             this.cell.node.onclick = () => {
             this.onSort(name)
             }
        });
       
    }

    private renderRow(): void {
      Object.values(this.data.items).map((winner) => {
        this.row = new Control(this.tbody.node, 'tr', '', '')
        this.row.node.innerHTML = `
          <td>${winner.id}</td>
          <td><div class="car-table" style="background-color: ${winner.car.color}"></div></td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>`
   });
    }
  }
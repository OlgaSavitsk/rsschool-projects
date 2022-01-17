import Control from "@/common/components/control";
import cell from "@/common/constants/constants";
import { IWinnerData } from "@/models/winner-model";

export default class Table extends Control {
    thead: Control<HTMLElement>;
    cell!: Control<HTMLElement>;
  tbody: Control<HTMLElement>;
  row!: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement, public data: IWinnerData) {
      super(parentNode, 'table', 'table', '');
      this.thead = new Control(this.node, 'thead', '', '')
      this.tbody = new Control(this.node, 'tbody', '', '')   
      this.renderCell()
      this.renderRow()
    }

    renderCell() {
        Object.values(cell).map((name) => {
             this.cell = new Control(this.thead.node, 'th', '', `${name}`)
        });
    }

    renderRow() {
      Object.values(this.data.items).map((winner) => {
        console.log(winner)
        this.row = new Control(this.tbody.node, 'tr', '', '')
        this.row.node.innerHTML = `
          <td>${winner.id}</td>
          <td>color</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        `
   });
    }
  }
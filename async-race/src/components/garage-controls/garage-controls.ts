import Control from '@/common/components/control';
import FormCreate from '../form-create/form-create';
import FormUpdate from '../form-update/form-update';
import PanelButtons from '../panel-buttons/panel-buttons';

export default class GarageControls extends Control {
  public formCreate: FormCreate;
  public formUpdate: FormUpdate;
  public panelButtons: PanelButtons;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'controls-container', '');
    this.formCreate = new FormCreate(this.node)
    this.formUpdate = new FormUpdate(this.node)
    this.panelButtons = new PanelButtons(this.node)
  }
}
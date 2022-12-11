import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EButtonStyle } from '../../../modules/form-elements/components/button/enums/button-style.enum';
import { IModalConfig } from './interfaces/modal-config.interface';

@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.scss']
})
export class PopupConfirmationComponent {

  public buttonStyle = EButtonStyle;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalConfig: IModalConfig,
    private _dialogRef: MatDialogRef<PopupConfirmationComponent>
  ) {
    _dialogRef.addPanelClass('mat-dialog-confirm-container')
  }
}

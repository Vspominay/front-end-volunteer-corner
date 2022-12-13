import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

import { ERequestStatus } from '../../../../enums/request-status.enum';
import { IStatusChange } from './interfaces/status-change-item.interface';

@Component({
  selector: 'app-status-change-sheet',
  templateUrl: './status-change-sheet.component.html',
  styleUrls: ['./status-change-sheet.component.scss']
})
export class StatusChangeSheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { sheetItems: IStatusChange[] },
    private _bottomSheet: MatBottomSheet) { }

  public closeBottomSheet(status: ERequestStatus): void {
    this._bottomSheet.dismiss(status);
  }
}

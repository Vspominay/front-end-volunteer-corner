import { Component, Input, OnInit } from '@angular/core';
import { STATUS_CHANGE_SHEET } from './constants/status-change-default.constant';

import { IStatusChange } from './interfaces/status-change-item.interface';

@Component({
  selector: 'app-status-change-sheet',
  templateUrl: './status-change-sheet.component.html',
  styleUrls: ['./status-change-sheet.component.scss']
})
export class StatusChangeSheetComponent implements OnInit {

  @Input() sheetItems: IStatusChange[] = [...STATUS_CHANGE_SHEET];

  constructor() { }

  ngOnInit(): void {
  }

}

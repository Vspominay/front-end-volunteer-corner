import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { ERequestStatus } from '../../../entities/requests/enums/request-status.enum';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements ICellRendererAngularComp {

  public textStatus!: string;
  public style!: string;

  @Input() set status(value: ERequestStatus) {
    this.textStatus = {
      [ERequestStatus.Active]: 'statuses.active',
      [ERequestStatus.Closed]: 'statuses.closed',
      [ERequestStatus.Canceled]: 'statuses.canceled'
    }[value];

    this.style = {
      [ERequestStatus.Active]: 'active',
      [ERequestStatus.Closed]: 'closed',
      [ERequestStatus.Canceled]: 'canceled'
    }[value];
  };

  public refresh(params: ICellRendererParams): boolean {
    return false;
  }

  public agInit(params: ICellRendererParams & { status: ERequestStatus }) {
    this.status = params.status;
  }

}

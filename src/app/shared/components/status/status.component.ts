import { Component, Input } from '@angular/core';
import { ERequestStatus } from '../../../entities/requests/enums/request-status.enum';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

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

  constructor() { }

}

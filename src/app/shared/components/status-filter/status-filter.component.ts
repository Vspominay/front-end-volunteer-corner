import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

import { ERequestStatus } from '../../../entities/requests/enums/request-status.enum';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-status-filter',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements IFilterAngularComp {

  public status!: ERequestStatus | null;
  public params!: IFilterParams;

  public readonly statuses: ERequestStatus[] = [ERequestStatus.Active, ERequestStatus.Closed, ERequestStatus.Canceled];

  public agInit(params: IFilterParams & { status: ERequestStatus }) {
    this.params = params;
  }

  public isFilterActive(): boolean {
    return !!this.status;
  }

  public doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.status === params.data.status;
  }

  public getModel() {
    if (!this.isFilterActive()) {
      return null;
    }

    return { value: this.status };
  }

  public setModel(model: any) {
  }

  public setFilter(status: ERequestStatus): void {
    this.status = this.status === status ? null : status;
    this.updateFilter();
  }

  updateFilter() {
    this.params.filterChangedCallback();
  }
}

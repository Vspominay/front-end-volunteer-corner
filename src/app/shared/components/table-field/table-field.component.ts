import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ITableField } from './interfaces/table-field.interface';

@Component({
  selector: 'app-table-field',
  templateUrl: './table-field.component.html',
  styleUrls: ['./table-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFieldComponent implements ICellRendererAngularComp {
  @Input() title!: string | null;
  @Input() subTitle?: string;

  public refresh(params: ICellRendererParams): boolean {
    return false;
  }

  public agInit(params: ICellRendererParams & ITableField) {
    [this.title, this.subTitle] = [params.title, params.subTitle];
  }

}

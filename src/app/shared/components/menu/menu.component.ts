import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IMenuItem } from './menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements ICellRendererAngularComp {

  @Input() icon: string = 'ic-more';
  @Input() items!: IMenuItem[];

  public refresh(params: ICellRendererParams): boolean {
    return false;
  }

  public agInit(params: ICellRendererParams & { items: IMenuItem[] }) {
    this.items = params.items;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Collection } from "ngx-pagination";

import { IMenuItem } from '../../../shared/components/menu/menu-item.interface';
import { IHelpRequest } from '../interfaces/help-request.interface';

@Component({
  selector: 'app-desktop-table',
  templateUrl: './desktop-table.component.html',
  styleUrls: ['./desktop-table.component.scss']
})
export class DesktopTableComponent implements OnInit {

  @Input() columns!: string[];
  @Input() data!: Collection<IHelpRequest>
  @Input() actions!: { [key: string]: IMenuItem[] };

  constructor() { }

  ngOnInit(): void {
  }

}

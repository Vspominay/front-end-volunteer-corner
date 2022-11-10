import { Component, Input, OnInit } from '@angular/core';
import { Collection } from "ngx-pagination";
import { IHelpRequest } from "../interfaces/help-request.interface";

@Component({
  selector: 'app-desktop-table',
  templateUrl: './desktop-table.component.html',
  styleUrls: ['./desktop-table.component.scss']
})
export class DesktopTableComponent implements OnInit {

  @Input() columns!: string[];
  @Input() data!: Collection<IHelpRequest>

  constructor() { }

  ngOnInit(): void {
  }

}

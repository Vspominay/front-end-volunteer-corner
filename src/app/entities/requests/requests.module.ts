import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { SharedModule } from "../../shared/shared.module";
import { DesktopTableComponent } from './desktop-table/desktop-table.component';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';


@NgModule({
  declarations: [
    RequestsComponent,
    DesktopTableComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    TranslateModule,
    MatTableModule,
    SharedModule,
    FormElementsModule
  ]
})
export class RequestsModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { DesktopTableComponent } from './desktop-table/desktop-table.component';


@NgModule({
  declarations: [
    RequestsComponent,
    DesktopTableComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    TranslateModule
  ]
})
export class RequestsModule {
}

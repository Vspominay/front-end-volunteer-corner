import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from "./dashboard.component";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class DashboardModule {
}

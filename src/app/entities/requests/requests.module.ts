import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { SharedModule } from "../../shared/shared.module";
import { StatusChangeSheetComponent } from './components/request-details/components/status-change-sheet/status-change-sheet.component';
import { DesktopTableComponent } from './desktop-table/desktop-table.component';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { RequestsActionControlService } from './services/requests-action-control.service';


@NgModule({
  declarations: [
    RequestsComponent,
    DesktopTableComponent,
    StatusChangeSheetComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    TranslateModule,
    MatTableModule,
    SharedModule,
    FormElementsModule,
    MatListModule
  ],
  providers: [
    RequestsActionControlService,
    MatBottomSheet
  ]
})
export class RequestsModule {
}

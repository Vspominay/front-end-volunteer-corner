import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from "@ngx-translate/core";

import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { SharedModule } from "../../shared/shared.module";
import { CreateRequestFormComponent } from './components/create-request-form/create-request-form.component';
import { StatusChangeSheetComponent } from './components/request-details/components/status-change-sheet/status-change-sheet.component';
import { DesktopTableComponent } from './desktop-table/desktop-table.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';

import { RequestsActionControlService } from './services/requests-action-control.service';


@NgModule({
  declarations: [
    RequestsComponent,
    DesktopTableComponent,
    StatusChangeSheetComponent,
    CreateRequestFormComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    TranslateModule,
    MatTableModule,
    SharedModule,
    FormElementsModule,
    MatListModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [
    RequestsActionControlService,
    MatBottomSheet
  ]
})
export class RequestsModule {
}

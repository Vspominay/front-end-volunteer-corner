import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { AgGridModule } from 'ag-grid-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

import { SharedModule } from '../../shared/shared.module';
import { CreateFormComponent } from '../requests/components/create-form/create-form.component';
import { RequestsRoutingModule } from './proposals-routing.module';
import { ProposalsComponent } from './proposals.component';
import { ProposalsActionControlService } from './services/proposals-action-control.service';
import { ProposalsState } from './state/proposals/proposals.state';

@NgModule({
  declarations: [
    ProposalsComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    FormElementsModule,
    AgGridModule,
    PaginationComponent,
    ReactiveFormsModule,
    TranslateModule,
    NgxPaginationModule,
    CreateFormComponent,
    NgxsModule.forFeature([ProposalsState])
  ],
  providers: [
    ProposalsActionControlService,
    MatBottomSheet
  ]
})
export class ProposalsModule {
}

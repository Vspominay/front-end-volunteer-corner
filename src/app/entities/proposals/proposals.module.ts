import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

import { SharedModule } from '../../shared/shared.module';
import { CreateFormComponent } from '../requests/components/create-form/create-form.component';
import { RequestsRoutingModule } from './proposals-routing.module';
import { ProposalsComponent } from './proposals.component';

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
    CreateFormComponent
  ]
})
export class ProposalsModule {
}

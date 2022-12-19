import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementsModule } from '../../../../modules/form-elements/form-elements.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PopupChangeDetailsComponent } from './components/popup-change-details/popup-change-details.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';

import { RequestDetailsRoutingModule } from './request-details-routing.module';
import { RequestDetailsComponent } from './request-details.component';
import { RequestResponseComponent } from './components/request-response/request-response.component';

@NgModule({
  declarations: [
    RequestDetailsComponent,
    ProductInfoComponent,
    PopupChangeDetailsComponent,
    RequestResponseComponent
  ],
  imports: [
    CommonModule,
    RequestDetailsRoutingModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    FormElementsModule,
    ReactiveFormsModule
  ]
})
export class RequestDetailsModule {
}

import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormElementsModule } from '../modules/form-elements/form-elements.module';

import { CardInformationComponent } from './components/card-information/card-information.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { InformationFieldComponent } from './components/information-field/information-field.component';
import { MenuComponent } from './components/menu/menu.component';
import { PopupConfirmationComponent } from './components/popup-confirmation/popup-confirmation.component';
import { StatusComponent } from './components/status/status.component';
import { TableFieldComponent } from './components/table-field/table-field.component';
import { ErrorControlPipe } from './pipes/error-control.pipe';

export const translationConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
    deps: [HttpClient],
  },
  defaultLanguage: 'en',
};

@NgModule({
  declarations: [
    DashboardCardComponent,
    TableFieldComponent,
    InformationFieldComponent,
    CardInformationComponent,
    StatusComponent,
    MenuComponent,
    PopupConfirmationComponent,
    ErrorControlPipe
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot(translationConfig),
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormElementsModule,
    MatDialogModule,
  ],
  exports: [
    DashboardCardComponent,
    TableFieldComponent,
    CardInformationComponent,
    InformationFieldComponent,
    StatusComponent,
    MenuComponent,
    PopupConfirmationComponent,
    ErrorControlPipe,
    TranslateModule
  ]
})
export class SharedModule {
}

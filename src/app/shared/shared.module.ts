import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

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
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot(translationConfig),
    MatIconModule,
  ],
  exports: [
    DashboardCardComponent,
  ]
})
export class SharedModule {
}

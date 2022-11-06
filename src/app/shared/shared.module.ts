import { HttpClient } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const translationConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
    deps: [HttpClient],
  },
  defaultLanguage: 'en',
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot(translationConfig),
  ],
  exports: [

  ]
})
export class SharedModule { }

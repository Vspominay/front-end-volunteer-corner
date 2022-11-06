import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsRegistrarService } from "./services/icons-registrar.service";
import { SharedModule } from "./shared/shared.module";
import { AppInitService } from "./services/app-init.service";

export function initializeAppSteps(appInitService: AppInitService): any {
  return (): Promise<any> => {
    return Promise.all([
      appInitService.init()
    ]);
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    [
      NgxsModule.forRoot([]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsStoragePluginModule.forRoot({
        key: [],
      })
    ],
    SharedModule,
    TranslateModule
  ],
  providers: [
    AppInitService,
    IconsRegistrarService,
    { provide: APP_INITIALIZER, useFactory: initializeAppSteps, deps: [AppInitService], multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

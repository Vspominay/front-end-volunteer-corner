import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthState } from "./entities/authentication/state/auth.state";
import { RequestsState } from "./entities/requests/state/requests/requests.state";
import { InterceptorModule } from "./interceptors/interceptor.module";
import { LayoutsModule } from "./modules/layouts/layouts.module";
import { AppInitService } from "./services/app-init.service";
import { IconsRegistrarService } from "./services/icons-registrar.service";
import { SharedModule } from "./shared/shared.module";

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
    InterceptorModule,
    [
      NgxsModule.forRoot([
        AuthState,
        RequestsState
      ]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsStoragePluginModule.forRoot({
        key: ['auth'],
      })
    ],
    SharedModule,
    TranslateModule,
    LayoutsModule
  ],
  providers: [
    AppInitService,
    IconsRegistrarService,
    { provide: APP_INITIALIZER, useFactory: initializeAppSteps, deps: [AppInitService], multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

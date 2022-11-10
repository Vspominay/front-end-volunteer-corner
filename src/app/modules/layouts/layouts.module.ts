import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { LeftMenuComponent } from "./left-menu/left-menu.component";

@NgModule({
  declarations: [
    LeftMenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    LeftMenuComponent
  ]
})
export class LayoutsModule {
}

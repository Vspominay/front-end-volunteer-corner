import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementsModule } from "../../modules/form-elements/form-elements.module";
import { SharedModule } from "../../shared/shared.module";
import { ComponentTastingsRoutingModule } from "./component-tastings.routing.module";
import { ComponentTestingComponent } from './component-testing/component-testing.component';



@NgModule({
  declarations: [
    ComponentTestingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentTastingsRoutingModule,
    FormElementsModule
  ]
})
export class ComponentTestingModule { }

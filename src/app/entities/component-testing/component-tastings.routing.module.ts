import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentTestingComponent } from "./component-testing/component-testing.component";

const routes: Routes = [
  {
    path: '',
    component: ComponentTestingComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentTastingsRoutingModule {
}
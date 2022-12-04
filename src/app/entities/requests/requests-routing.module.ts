import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from "./requests.component";

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    pathMatch: "full"
  },
  {
    path: 'info',
    loadChildren: () => import('./components/request-details/request-details.module').then(m => m.RequestDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {
}

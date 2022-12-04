import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from "./requests.component";
import { RequestsResolver } from './services/requests.resolver';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    pathMatch: 'full',
    resolve: { requests: RequestsResolver }
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

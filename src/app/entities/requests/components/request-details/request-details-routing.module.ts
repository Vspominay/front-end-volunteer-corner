import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestDetailsComponent } from './request-details.component';
import { RequestDetailsResolver } from './services/request-details.resolver';


const routes: Routes = [
  {
    path: ':id',
    component: RequestDetailsComponent,
    resolve: { request: RequestDetailsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDetailsRoutingModule {
}

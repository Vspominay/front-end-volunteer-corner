import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProposalsComponent } from './proposals.component';
import { ProposalsResolver } from './services/proposals.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProposalsComponent,
    pathMatch: 'full',
    resolve: { proposals: ProposalsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {
}

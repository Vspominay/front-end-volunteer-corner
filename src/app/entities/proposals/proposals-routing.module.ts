import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailsComponent } from '../requests/components/request-details/request-details.component';

import { ProposalsComponent } from './proposals.component';
import { ProposalInformationResolver } from './services/proposal-information.resolver';
import { ProposalsResolver } from './services/proposals.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProposalsComponent,
    pathMatch: 'full',
    resolve: { proposals: ProposalsResolver }
  },
  {
    path: 'info/:id',
    component: RequestDetailsComponent,
    resolve: { entityDetail: ProposalInformationResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {
}

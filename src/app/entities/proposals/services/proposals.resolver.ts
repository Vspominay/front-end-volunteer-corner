import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';

import { IProposal } from '../interfaces/proposal.interface';
import { FetchProposals } from '../state/proposals/proposals.actions';
import { ProposalsState } from '../state/proposals/proposals.state';

@Injectable({
  providedIn: 'root'
})
export class ProposalsResolver implements Resolve<IProposal[]> {
  constructor(private _store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProposal[]> {
    return this._store
               .select(ProposalsState.isFetched)
               .pipe(
                 switchMap((isFetched) => {
                   if (isFetched) {
                     return this._store.selectSnapshot(ProposalsState.proposals);
                   }

                   return this._store.dispatch(new FetchProposals());
                 })
               );
  }
}

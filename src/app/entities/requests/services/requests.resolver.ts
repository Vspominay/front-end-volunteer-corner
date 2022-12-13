import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';

import { IHelpRequest } from '../interfaces/help-request.interface';
import { FetchRequests } from '../state/requests/requests.actions';
import { RequestsState } from '../state/requests/requests.state';

@Injectable({
  providedIn: 'root'
})
export class RequestsResolver implements Resolve<IHelpRequest[]> {

  constructor(private _store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHelpRequest[]> {
    return this._store
               .select(RequestsState.isFetched)
               .pipe(
                 switchMap((isFetched) => {
                   if (isFetched) {
                     return this._store.selectSnapshot(RequestsState.requests);
                   }

                   return this._store.dispatch(new FetchRequests({}));
                 })
               );
  }
}

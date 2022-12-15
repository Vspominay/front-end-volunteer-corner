import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, first, map, Observable } from 'rxjs';

import { GetProfileData } from '../state/profile.actions';
import { ProfileState } from '../state/profile.state';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {

  constructor(private _store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._store.select(ProfileState.isFetchedData)
               .pipe(
                 map(isFetched => {
                   if (isFetched) {
                     return EMPTY;
                   }

                   return this._store.dispatch(new GetProfileData());
                 }),
                 first()
               );
  }
}

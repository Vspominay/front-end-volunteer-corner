import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { first, map, Observable, of } from 'rxjs';

import { IHelpRequest } from '../../../interfaces/help-request.interface';
import { RequestsService } from '../../../services/requests.service';
import { GetRequestInformation } from '../../../state/requests/requests.actions';
import { RequestsState } from '../../../state/requests/requests.state';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailsResolver implements Resolve<IHelpRequest> {
  constructor(private _requestsService: RequestsService, private _store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHelpRequest> {
    const id = route.paramMap.get('id');

    const cachedRequest = this._store.selectSnapshot(RequestsState.getRequest)(id!);
    const responses = cachedRequest?.responses;

    return cachedRequest && responses && responses.length ? of(cachedRequest) : this._store.dispatch(new GetRequestInformation(id!))
                                                                                    .pipe(
                                                                                      first(),
                                                                                      map(() => this._store.selectSnapshot(RequestsState.getRequest)(id!)!
                                                                                      ));
  }
}

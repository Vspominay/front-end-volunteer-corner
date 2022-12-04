import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { first, map, Observable, of } from 'rxjs';
import { IHelpRequest } from '../../../interfaces/help-request.interface';

import { RequestsService } from '../../../services/requests.service';
import { GetRequestInformation } from '../../../state/requests.actions';
import { RequestsState } from '../../../state/requests.state';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailsResolver implements Resolve<IHelpRequest> {
  constructor(private _requestsService: RequestsService, private _store: Store) {}

  //
  // private request: IHelpRequest = {
  //   "owner": {
  //     "firstName": "testUser1",
  //     "lastName": "testUser1",
  //     "email": "testUser1@example.com",
  //     "phone": null,
  //     "id": "1d7d9db1-8aae-439d-a70c-2b6eadbff6aa",
  //     "createdBy": null,
  //     "createdDate": "2022-10-25T21:53:22.8257472",
  //     "lastModifiedBy": null,
  //     "lastModifiedDate": "2022-10-25T21:53:22.825787"
  //   },
  //   "name": "Test23232",
  //   "location": "",
  //   "description": "Test12312312",
  //   "status": 1000,
  //   "additionalDocuments": [],
  //   "id": "f0b75712-9ab6-4c22-b1dc-5b7da605ed9b",
  //   "createdBy": null,
  //   "createdDate": "2022-11-11T16:30:20.4967218",
  //   "lastModifiedBy": null,
  //   "lastModifiedDate": "2022-11-11T16:30:20.4967617"
  // };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHelpRequest> {
    const id = route.paramMap.get('id');

    const cachedRequest = this._store.selectSnapshot(RequestsState.getRequest)(id!);

    console.log(cachedRequest);

    return cachedRequest ? of(cachedRequest) : this._store.dispatch(new GetRequestInformation(id!))
                                                   .pipe(
                                                     first(),
                                                     map(() => this._store.selectSnapshot(RequestsState.getRequest)(id!)!
                                                     ));
  }
}

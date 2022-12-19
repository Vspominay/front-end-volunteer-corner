import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, first, map, Observable, of } from 'rxjs';

import { IHelpRequest } from '../../../interfaces/help-request.interface';
import { RequestsService } from '../../../services/requests.service';
import { GetRequestInformation } from '../../../state/requests/requests.actions';
import { RequestsState } from '../../../state/requests/requests.state';
import { IPersonInformation, IRequestDetail } from '../interfaces/request-details.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailsResolver implements Resolve<IRequestDetail> {
  constructor(private _requestsService: RequestsService, private _store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequestDetail> {
    const id = route.paramMap.get('id');

    const cachedRequest = this._getRequestInformation(id!);
    const responses = cachedRequest?.responses;

    return cachedRequest && responses && responses.length ? of(this._retrieveRequestDetail(cachedRequest)) : this._store.dispatch(new GetRequestInformation(id!))
                                                                                                                 .pipe(
                                                                                                                   first(),
                                                                                                                   map(() => this._getRequestInformation(id!)!),
                                                                                                                   filter(request => !!request),
                                                                                                                   map((request) => this._retrieveRequestDetail(request))
                                                                                                                 );
  }

  private _getRequestInformation(id: string): IHelpRequest | undefined {
    console.log(id)
    console.log(this._store.selectSnapshot(RequestsState.getRequest)(id!))
    return this._store.selectSnapshot(RequestsState.getRequest)(id!);
  }

  private _retrieveRequestDetail(request: IHelpRequest): IRequestDetail {
    const {
      id,
      createdDate,
      responses,
      createdBy,
      lastModifiedBy,
      description,
      name,
      location,
      owner,
      additionalDocuments,
      lastModifiedDate
    } = request;
    const recipientData: IPersonInformation = {
      location,
      createdDate,
      name: owner.firstName + ' ' + owner.lastName,
      email: owner.email,
      phone: owner.phone,
      lastModifiedDate
    }

    return {
      id,
      createdDate,
      lastModifiedDate,
      createdBy,
      lastModifiedBy,
      title: name!,
      responses,
      description: description!,
      volunteerData: {},
      documents: additionalDocuments,
      recipientData
    }
  }
}

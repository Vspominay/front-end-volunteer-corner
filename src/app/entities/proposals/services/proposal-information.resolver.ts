import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { first, map, Observable, of } from 'rxjs';

import { IPersonInformation, IRequestDetail } from '../../requests/components/request-details/interfaces/request-details.interface';
import { IProposal } from '../interfaces/proposal.interface';
import { GetProposalInformation } from '../state/proposals/proposals.actions';
import { ProposalsState } from '../state/proposals/proposals.state';
import { ProposalsService } from './proposals.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalInformationResolver implements Resolve<IRequestDetail> {
  constructor(private _proposalService: ProposalsService, private _store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequestDetail> {
    const id = route.paramMap.get('id');

    const cachedProposal = this._getProposalById(id!);

    return cachedProposal ? of(this._retrieveProposalDetail(cachedProposal)) : this._store.dispatch(new GetProposalInformation(id!))
                                                                                   .pipe(
                                                                                     first(),
                                                                                     map(() => this._retrieveProposalDetail(this._getProposalById(id!)!))
                                                                                   )
  }

  private _getProposalById(id: string): IProposal | undefined {
    return this._store.selectSnapshot(ProposalsState.proposal)(id);
  }

  private _retrieveProposalDetail(proposal: IProposal): IRequestDetail {
    const {
      id,
      createdAt,
      modifiedAt,
      description,
      name, location,
      owner
    } = proposal;

    const volunteerData: IPersonInformation = {
      location,
      createdDate: createdAt,
      lastModifiedDate: modifiedAt,
      name: owner.user.firstName + ' ' + owner.user.lastName,
      email: owner.user.email,
      phone: owner.user.phone
    }

    return {
      id,
      createdDate: createdAt,
      lastModifiedDate: modifiedAt,
      title: name,
      description,
      volunteerData,
      recipientData: {},
      responses: [],
      lastModifiedBy: null,
      documents: [],
      createdBy: null
    }
  }
}

import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { ProposalsService } from '../../services/proposals.service';
import { ChangeProposalStatus, CreateProposal, FetchProposals, GetProposalInformation, UpdateProposalInformation } from './proposals.actions';
import { IProposalsState } from './proposals.models';

@State<IProposalsState>({
  name: 'proposals',
  defaults: {
    proposals: [],
    search: '',
    isFetched: false
  }
})
@Injectable()
export class ProposalsState {

  @Selector()
  static proposals(state: IProposalsState) {
    return state.proposals;
  }

  @Selector()
  static isFetched(state: IProposalsState) {
    return state.isFetched;
  }

  @Selector()
  static getRequest(state: IProposalsState) {
    return (id: string) => state.proposals.find(request => request.id === id);
  }

  constructor(private proposalsService: ProposalsService) {}

  @Action(FetchProposals)
  fetchRequests({ patchState }: StateContext<IProposalsState>) {
    return this.proposalsService.getProposals()
               .pipe(tap((proposals) => {
                 patchState({
                   proposals,
                   isFetched: true
                 });
               }));
  }

  @Action(GetProposalInformation)
  getRequestInformation({ patchState, getState }: StateContext<IProposalsState>, { payload }: GetProposalInformation) {
    const proposals = getState().proposals;

    if (proposals.findIndex(request => request.id === payload) !== -1) return;

    return this.proposalsService.getProposal(payload)
               .pipe(
                 tap(request => {
                   patchState({
                     proposals: [...proposals, request]
                   });
                 })
               );
  }

  @Action(UpdateProposalInformation)
  updateRequestInformation({
    patchState,
    getState
  }: StateContext<IProposalsState>, { payload }: UpdateProposalInformation) {
    return this.proposalsService.updateProposal(payload.id, payload.name, payload.description, payload.location)
               .pipe(
                 tap(request => {
                   patchState({ proposals: getState().proposals.map(stateReq => request.id === payload.id ? request : stateReq) });
                 })
               )
  }

  @Action(CreateProposal)
  createHelpRequest({ patchState, getState }: StateContext<IProposalsState>, { payload }: CreateProposal) {
    return this.proposalsService.createProposal(payload.name, payload.location, payload.description)
               .pipe(tap(proposal => {
                 patchState({
                   proposals: [proposal, ...getState().proposals]
                 });
               }));
  }

  @Action(ChangeProposalStatus)
  changeRequestStatus({ patchState, getState }: StateContext<IProposalsState>, { payload }: ChangeProposalStatus) {
    return this.proposalsService.changeProposalStatus(payload.id, payload.status)
               .pipe(tap(status => {
                 patchState({
                   proposals: getState().proposals.map(req => req.id === payload.id ? { ...req, status } : req)
                 });
               }));
  }
}

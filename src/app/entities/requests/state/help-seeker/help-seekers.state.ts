import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { HelpSeekersService } from '../../services/help-seekers.service';
import { FetchHelpSeekers, GetOwnHelpRequests } from './help-seekers.actions';
import { IHelpSeekersState } from "./help-seekers.models";

@State<IHelpSeekersState>({
  name: 'helpSeekers',
  defaults: {
    requests: [],
    helpSeekers: [],
    isFetched: {
      requests: false,
      helpSeekers: false
    }
  }
})
@Injectable()
export class HelpSeekersState {

  @Selector()
  static requests(state: IHelpSeekersState) {
    return state.requests;
  }

  @Selector()
  static isFetched(state: IHelpSeekersState) {
    return state.isFetched;
  }

  @Selector()
  static getRequest(state: IHelpSeekersState) {
    return (id: string) => state.requests.find(request => request.id === id);
  }

  constructor(private helpSeekersService: HelpSeekersService) {}

  @Action(FetchHelpSeekers)
  fetchRequests({ patchState, getState }: StateContext<IHelpSeekersState>, { payload }: FetchHelpSeekers) {
    const state = getState();

    return this.helpSeekersService.getHelpSeekers(payload.search, payload.isApproved)
               .pipe(tap((helpSeekers) => {
                 patchState({
                   helpSeekers,
                   isFetched: {
                     ...state.isFetched,
                     helpSeekers: true
                   }
                 });
               }));
  }

  @Action(GetOwnHelpRequests)
  getOwnHelpRequests({ patchState, getState }: StateContext<IHelpSeekersState>) {
    const state = getState();
    return this.helpSeekersService.getOwnHelpRequests()
               .pipe(tap(requests => {
                 patchState({
                   requests,
                   isFetched: {
                     ...state.isFetched,
                     requests: true
                   }
                 })
               }));
  }

  //
  // @Action(GetRequestInformation)
  // getRequestInformation({ patchState, getState }: StateContext<IHelpSeekersState>, { payload }: GetRequestInformation) {
  //   const requests = getState().requests;
  //
  //   if (requests.findIndex(request => request.id === payload) !== -1) return;
  //
  //   return this.requestsService.getRequest(payload)
  //              .pipe(
  //                tap(request => {
  //                  patchState({
  //                    requests: [...requests, request]
  //                  });
  //                })
  //              );
  // }
  //
  // @Action(UpdateRequestInformation)
  // updateRequestInformation({
  //   patchState,
  //   getState
  // }: StateContext<IHelpSeekersState>, { payload }: UpdateRequestInformation) {
  //   return this.requestsService.updateHelpRequest(payload.id, payload.name, payload.description, payload.location)
  //              .pipe(
  //                tap(request => {
  //                  patchState({ requests: getState().requests.map(stateReq => request.id === payload.id ? request : stateReq) });
  //                })
  //              )
  // }
  //
  // @Action(CreateHelpRequest)
  // createHelpRequest({ patchState, getState }: StateContext<IHelpSeekersState>, { payload }: CreateHelpRequest) {
  //   return this.requestsService.createRequest(payload.name, payload.location, payload.description)
  //              .pipe(tap(request => {
  //                patchState({
  //                  requests: [request, ...getState().requests]
  //                });
  //              }));
  // }
  //
  // @Action(ChangeRequestStatus)
  // changeRequestStatus({ patchState, getState }: StateContext<IHelpSeekersState>, { payload }: ChangeRequestStatus) {
  //   return this.requestsService.changeRequestStatus(payload.id, payload.status)
  //              .pipe(tap(status => {
  //                patchState({
  //                  requests: getState().requests.map(req => req.id === payload.id ? { ...req, status } : req)
  //                });
  //              }));
  // }
  //
  // @Action(DeleteRequestInformation)
  // deleteRequestInformation({
  //   patchState,
  //   getState
  // }: StateContext<IHelpSeekersState>, { payload }: DeleteRequestInformation) {
  //   return this.requestsService.deleteRequest(payload)
  //              .pipe(tap(() => {
  //                patchState({
  //                  requests: getState().requests.filter(request => request.id !== payload)
  //                })
  //              }));
  // }
}

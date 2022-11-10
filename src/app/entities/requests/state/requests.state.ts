import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { RequestsService } from "../services/requests.service";
import { FetchRequests } from "./requests.actions";
import { IRequestsState } from "./requests.models";

@State<IRequestsState>({
  name: 'requests',
  defaults: {
    requests: []
  }
})
@Injectable()
export class RequestsState {

  @Selector()
  static requests(state: IRequestsState) {
    return state.requests;
  }

  constructor(private requestsService: RequestsService) {}

  @Action(FetchRequests)
  fetchRequests({ patchState }: StateContext<IRequestsState>, { payload }: FetchRequests) {
    return this.requestsService.getHelpRequests(payload.search, payload.status, payload.startDate, payload.endDate)
               .pipe(tap((requests) => {
                 patchState({
                   requests
                 });
               }));
  }
}
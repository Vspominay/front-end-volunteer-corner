import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { RequestsService } from "../../services/requests.service";
import { ChangeRequestStatus, CreateHelpRequest, CreateResponse, DeleteRequestInformation, FetchRequests, GetRequestInformation, UpdateRequestInformation, UploadRequestDocument } from "./requests.actions";
import { IRequestsState } from "./requests.models";

@State<IRequestsState>({
  name: 'requests',
  defaults: {
    requests: [],
    search: '',
    isFetched: false
  }
})
@Injectable()
export class RequestsState {

  @Selector()
  static requests(state: IRequestsState) {
    return state.requests;
  }

  @Selector()
  static isFetched(state: IRequestsState) {
    return state.isFetched;
  }

  @Selector()
  static getRequest(state: IRequestsState) {
    return (id: string) => state.requests.find(request => request.id === id);
  }

  constructor(private requestsService: RequestsService) {}

  @Action(FetchRequests)
  fetchRequests({ patchState }: StateContext<IRequestsState>, { payload }: FetchRequests) {
    return this.requestsService.getHelpRequests(payload.search, payload.status, payload.startDate, payload.endDate)
               .pipe(tap((requests) => {
                 patchState({
                   requests,
                   isFetched: true
                 });
               }));
  }

  @Action(GetRequestInformation)
  getRequestInformation({ patchState, getState }: StateContext<IRequestsState>, { payload }: GetRequestInformation) {
    const requests = getState().requests;
    const hasRequest = requests.findIndex(req => req.id === payload) !== -1;

    return this.requestsService.getRequest(payload)
               .pipe(
                 tap(request => {
                   patchState({
                     requests: hasRequest ? requests.map(req => req.id === request.id ? request : req) : [...requests, request]
                   });
                 })
               );
  }

  @Action(UpdateRequestInformation)
  updateRequestInformation({
    patchState,
    getState
  }: StateContext<IRequestsState>, { payload }: UpdateRequestInformation) {
    return this.requestsService.updateHelpRequest(payload.id, payload.name, payload.description, payload.location)
               .pipe(
                 tap(request => {
                   patchState({ requests: getState().requests.map(stateReq => request.id === payload.id ? request : stateReq) });
                 })
               )
  }

  @Action(CreateHelpRequest)
  createHelpRequest({ patchState, getState }: StateContext<IRequestsState>, { payload }: CreateHelpRequest) {
    return this.requestsService.createRequest(payload.name, payload.location, payload.description)
               .pipe(tap(request => {
                 patchState({
                   requests: [request, ...getState().requests]
                 });
               }));
  }

  @Action(ChangeRequestStatus)
  changeRequestStatus({ patchState, getState }: StateContext<IRequestsState>, { payload }: ChangeRequestStatus) {
    return this.requestsService.changeRequestStatus(payload.id, payload.status)
               .pipe(tap(status => {
                 patchState({
                   requests: getState().requests.map(req => req.id === payload.id ? { ...req, status } : req)
                 });
               }));
  }

  @Action(DeleteRequestInformation)
  deleteRequestInformation({
    patchState,
    getState
  }: StateContext<IRequestsState>, { payload }: DeleteRequestInformation) {
    return this.requestsService.deleteRequest(payload)
               .pipe(tap(() => {
                 patchState({
                   requests: getState().requests.filter(request => request.id !== payload)
                 })
               }));
  }

  @Action(CreateResponse)
  createResponse({ patchState, getState }: StateContext<IRequestsState>, { payload }: CreateResponse) {
    return this.requestsService.createResponse(payload.id, payload.comment);
  }

  @Action(UploadRequestDocument)
  uploadRequestDocument({ patchState }: StateContext<IRequestsState>, { payload }: UploadRequestDocument) {
    return this.requestsService.uploadRequestDocuments(payload.id, payload.file);
  }
}

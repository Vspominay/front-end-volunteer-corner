import { IHelpRequest } from "../interfaces/help-request.interface";

export interface IRequestsState {
  requests: IHelpRequest[],
  search: string,
  isFetched: boolean
}

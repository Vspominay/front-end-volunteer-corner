import { ERequestStatus } from "../enums/request-status.enum";

export class FetchRequests {
  static readonly type = '[Requests] Fetch requests';

  constructor(public payload: { search?: string, status?: ERequestStatus, startDate?: string, endDate?: string }) {}
}
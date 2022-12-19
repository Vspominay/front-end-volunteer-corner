import { ICreateEntity } from '../../../../interfaces/create-entity.interface';
import { ERequestStatus } from "../../enums/request-status.enum";

export class FetchRequests {
  static readonly type = '[Requests] Fetch requests';

  constructor(public payload: { search?: string, status?: ERequestStatus, startDate?: string, endDate?: string }) {}
}

export class GetRequestInformation {
  static readonly type = '[Requests] Get Request information';

  constructor(public payload: string) {}
}

export class CreateHelpRequest {
  static readonly type = '[Requests] Create help request';

  constructor(public payload: ICreateEntity) {}
}

export class UpdateRequestInformation {
  static readonly type = '[Requests] Update Request information';

  constructor(public payload: { id: string, name: string, location: string, description: string }) {}
}

export class DeleteRequestInformation {
  static readonly type = '[Request] Delete request information';

  constructor(public payload: string) {}
}

export class ChangeRequestStatus {
  static readonly type = '[Request] Change request status';

  constructor(public payload: { id: string, status: ERequestStatus }) {}
}

export class CreateResponse {
  static readonly type = '[Request] Create response';

  constructor(public payload: { id: string, comment: string }) {}
}

export class DeleteRequestDocuments {
  static readonly type = '[Request] Delete request documents';

  constructor(public payload: number) {}
}

export class UploadRequestDocument {
  static readonly type = '[Request] Upload request documents';

  constructor(public payload: { id: string, file: File }) {}
}

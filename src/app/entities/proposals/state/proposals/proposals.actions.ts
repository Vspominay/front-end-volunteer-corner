import { ICreateEntity } from '../../../../interfaces/create-entity.interface';
import { ERequestStatus } from '../../../requests/enums/request-status.enum';

export class FetchProposals {
  static readonly type = '[Proposals] Fetch Proposals';
}

export class GetProposalInformation {
  static readonly type = '[Proposals] Get Proposal information';

  constructor(public payload: string) {}
}

export class CreateProposal {
  static readonly type = '[Proposals] Create Proposal';

  constructor(public payload: ICreateEntity) {}
}

export class UpdateProposalInformation {
  static readonly type = '[Proposals] Update Proposal information';

  constructor(public payload: { id: string, name: string, location: string, description: string }) {}
}

export class ChangeProposalStatus {
  static readonly type = '[Proposal] Change Proposal status';

  constructor(public payload: { id: string, status: ERequestStatus }) {}
}

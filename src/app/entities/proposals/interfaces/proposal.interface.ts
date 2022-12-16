import { ERequestStatus } from '../../requests/enums/request-status.enum';

export interface IProposal {
  id: string,
  name: string,
  ownerId: string,
  description: string,
  status: ERequestStatus,
  createdAt: string,
  modifiedAt: string,
  location: string
}

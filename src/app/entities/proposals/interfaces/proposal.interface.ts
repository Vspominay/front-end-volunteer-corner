import { ERequestStatus } from '../../requests/enums/request-status.enum';

export interface IProposal {
  id: string,
  name: string,
  owner: IProposalOwner,
  description: string,
  status: ERequestStatus,
  createdAt: string,
  modifiedAt: string,
  location: string
}

export interface IProposalOwner {
  id: string,
  user: {
    id: string,
    roles: IRole[],
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    phone: string
  },
  createdAt: string,
  modifiedAt: string,
  approved: boolean
}

interface IRole {
  id: string,
  name: string,
  normalizedName: string,
  stamp: string
}

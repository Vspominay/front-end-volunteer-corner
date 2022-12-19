import { IProposal } from '../../interfaces/proposal.interface';

export interface IProposalsState {
  proposals: IProposal[],
  search: string,
  isFetched: boolean
}

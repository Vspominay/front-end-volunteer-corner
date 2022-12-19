import { IProfile } from '../../profile/interfaces/profile.interface';
import { IBaseCreatedEntity } from './base-created-entity.interface';
import { IHelpRequest } from './help-request.interface';

export interface IRequestResponse extends IBaseCreatedEntity {
  "helpRequestTo": IHelpRequest,
  "volunteerFrom": IProfile,
  "includedHelpProposal": boolean | null,
  "comment": string,
  "selectedByHelpSeeker": boolean
}

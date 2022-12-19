import { IHelpRequest } from '../../interfaces/help-request.interface';
import { IHelpSeeker } from '../../interfaces/help-seeker.interface';

export interface IHelpSeekersState {
  requests: IHelpRequest[],
  helpSeekers: IHelpSeeker[],
  isFetched: {
    requests: boolean,
    helpSeekers: boolean
  }
}

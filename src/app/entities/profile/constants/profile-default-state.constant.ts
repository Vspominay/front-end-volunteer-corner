import { EDisplayPolicy } from '../../../enums/display-policy.enum';
import { IProfileState } from '../state/profile.models';

export const PROFILE_DEFAULT_STATE: IProfileState = {
  id: '',
  userName: '',
  firstName: '',
  email: '',
  lastName: '',
  contactsDisplayPolicy: EDisplayPolicy.AllowAll,
  phoneNumber: '',
  isFetched: false
}

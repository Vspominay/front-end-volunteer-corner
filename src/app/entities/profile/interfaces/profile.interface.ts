import { EDisplayPolicy } from '../../../enums/display-policy.enum';

export interface IProfile {
  id: string,
  userName: string,
  email: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  contactsDisplayPolicy: EDisplayPolicy
}

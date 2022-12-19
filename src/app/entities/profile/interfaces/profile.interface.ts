import { EDisplayPolicy } from '../../../enums/display-policy.enum';
import { IBaseCreatedEntity } from '../../requests/interfaces/base-created-entity.interface';

export interface IProfile extends IBaseCreatedEntity {
  userName: string,
  email: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  contactsDisplayPolicy: EDisplayPolicy
}

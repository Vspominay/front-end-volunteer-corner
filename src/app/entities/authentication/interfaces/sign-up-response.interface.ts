import { EAccountType } from '../../../enums/account-type.enum';

export interface ISignUpResponse {
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  accountType: EAccountType
}

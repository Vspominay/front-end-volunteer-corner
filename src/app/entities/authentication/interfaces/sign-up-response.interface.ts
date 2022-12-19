import { EAccountType } from '../../../enums/account-type.enum';

export interface ISignUpReq {
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  accountType: EAccountType
}

import { IProfile } from '../../profile/interfaces/profile.interface';

export interface ILoginResponse {
  isAuthSuccessful: boolean,
  errorMessage: string,
  token: string,
  userInfo: IProfile
}

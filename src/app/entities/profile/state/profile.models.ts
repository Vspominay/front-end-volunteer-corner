import { IProfile } from '../interfaces/profile.interface';

export interface IProfileState extends IProfile {
  isFetched: boolean
}

import { IProfile } from '../interfaces/profile.interface';
import { IUpdateProfileRequest } from '../interfaces/update-profile-request.interface';

export class GetProfileData {
  static readonly type = '[Profile] Get profile data';
}

export class UpdateUserProfile {
  static readonly type = '[Profile] Update user profile';

  constructor(public payload: IUpdateProfileRequest) {}
}

export class SetUserName {
  static readonly type = '[Profile] Set user name';

  constructor(public payload: string) {}
}

export class ResetProfile {
  static readonly type = '[Profile] Reset profile';
}

export class SetProfileData {
  static readonly type = '[Profile] Set profile data';

  constructor(public payload: IProfile) {}
}

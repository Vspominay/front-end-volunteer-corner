import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { PROFILE_DEFAULT_STATE } from '../constants/profile-default-state.constant';
import { ProfileService } from '../services/profile.service';
import { GetProfileData, ResetProfile, SetUserName, UpdateUserProfile } from './profile.actions';
import { IProfileState } from './profile.models';

@State<IProfileState>({
  name: 'profile',
  defaults: { ...PROFILE_DEFAULT_STATE }
})
@Injectable()
export class ProfileState {

  @Selector()
  static fullName(state: IProfileState) {
    return `${state.firstName} ${state.lastName}`;
  }

  @Selector()
  static profileData(state: IProfileState) {
    const { firstName, lastName, phoneNumber, email } = state;
    return { firstName, lastName, phoneNumber, email };
  }

  @Selector()
  static isFetchedData(state: IProfileState) {
    return state.isFetched;
  }

  constructor(private _profileService: ProfileService) {}

  @Action(GetProfileData)
  getProfileData({ patchState }: StateContext<IProfileState>) {
    return this._profileService.getProfile()
               .pipe(tap(profile => {
                 console.log(profile)
                 patchState({
                   ...profile,
                   isFetched: true
                 });
               }));
  }

  @Action(UpdateUserProfile)
  updateUserProfile({ patchState }: StateContext<IProfileState>, { payload }: UpdateUserProfile) {

    return this._profileService.updateProfile(payload)
               .pipe(tap(profile => {
                 patchState({
                   ...profile
                 });
               }));
  }

  @Action(SetUserName)
  setUserName({ patchState }: StateContext<IProfileState>, { payload }: SetUserName) {
    patchState({
      firstName: payload
    });
  }

  @Action(ResetProfile)
  resetProfile({ setState }: StateContext<IProfileState>) {
    setState({
      ...PROFILE_DEFAULT_STATE
    });
  }
}

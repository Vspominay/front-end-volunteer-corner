import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { SetProfileData } from '../../profile/state/profile.actions';
import { AuthService } from '../services/auth.service';
import { Login, Logout, SignUp } from './auth.actions';
import { IAuthState } from './auth.models';

@State<IAuthState>({
  name: 'auth',
  defaults: {
    token: ''
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: IAuthState) {
    return state.token;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login({ patchState, dispatch }: StateContext<IAuthState>, { payload }: Login) {
    return this.authService.login(payload.userName, payload.password)
               .pipe(tap(({ token, userInfo }) => {

                 dispatch(new SetProfileData(userInfo));

                 patchState({
                   token
                 });
               }));
  }

  @Action(Logout)
  logout({ patchState }: StateContext<IAuthState>) {
    patchState({
      token: ''
    });
  }

  @Action(SignUp)
  signUp({ patchState, dispatch }: StateContext<IAuthState>, { payload }: SignUp) {
    return this.authService.signUp(payload)
               .pipe(tap(profile => {
                 dispatch(new SetProfileData(profile));
               }));
  }
}

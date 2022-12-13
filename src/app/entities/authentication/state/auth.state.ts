import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { SetUserName } from '../../profile/state/profile.actions';
import { AuthService } from '../services/auth.service';
import { Login, Logout } from './auth.actions';
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
               .pipe(tap(({ token }) => {

                 dispatch(new SetUserName(payload.userName));

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
}

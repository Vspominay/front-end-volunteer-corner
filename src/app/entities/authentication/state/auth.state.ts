import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { AuthService } from "../services/auth.service";
import { Login, Logout } from "./auth.actions";
import { IAuthState } from "./auth.models";

@State<IAuthState>({
  name: 'auth',
  defaults: {
    token: '',
    userName: ''
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
  login({ patchState }: StateContext<IAuthState>, { payload }: Login) {
    console.log('===============LOGIN ', payload)
    return this.authService.login(payload.userName, payload.password)
               .pipe(tap(({ token }) => {
                 console.log('success login')

                 patchState({
                   userName: payload.userName,
                   token
                 })
               }));
  }

  @Action(Logout)
  logout({ patchState }: StateContext<IAuthState>) {
    patchState({
      token: '',
      userName: ''
    });
  }
}

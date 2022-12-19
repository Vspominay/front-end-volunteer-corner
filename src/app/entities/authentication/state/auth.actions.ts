import { ISignUpReq } from '../interfaces/sign-up-response.interface';

export class Login {
  static readonly type = '[Authentication] Login';

  constructor(public payload: { userName: string, password: string }) {}
}

export class Logout {
  static readonly type = '[Authentication] Logout';
}

export class SignUp {
  static readonly type = '[Authentication] Sign up';

  constructor(public payload: ISignUpReq) {}
}

export class Login {
  static readonly type = '[Authentication] Login';

  constructor(public payload: { userName: string, password: string }) {}
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IProfile } from '../../profile/interfaces/profile.interface';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { ISignUpReq } from '../interfaces/sign-up-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = environment.requestsApi;

  constructor(private http: HttpClient) { }

  public login(userName: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.api}Users/Login`, {
      password, userName
    });
  }

  public signUp(signUpResponse: ISignUpReq): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.api}Users/Register`, signUpResponse);
  }
}

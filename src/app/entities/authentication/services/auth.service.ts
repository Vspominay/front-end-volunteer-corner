import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";
import { ILoginResponse } from "../interfaces/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = environment.api;

  constructor(private http: HttpClient) { }

  public login(userName: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.api}Users/Login`, {
      password, userName
    });
  }
}

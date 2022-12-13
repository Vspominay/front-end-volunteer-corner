import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IProfile } from '../interfaces/profile.interface';
import { IUpdateProfileRequest } from '../interfaces/update-profile-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly api = environment.api;

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.api}Users/profile`);
  }

  public updateProfile(updateUserData: IUpdateProfileRequest): Observable<IProfile> {
    return this.http.put<IProfile>(`${this.api}Users/UpdateProfile`, { ...updateUserData })
  }
}

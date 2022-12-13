import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
    return this.http.get<Omit<IProfile, 'phoneNumber'> & { phone: string, helpSeeker: Omit<IProfile, 'phoneNumber'> & { phone: string } }>(`${this.api}Users/profile`)
               .pipe(map(profile => ({
                 ...profile,
                 phoneNumber: profile.helpSeeker.phone,
                 email: profile.helpSeeker.email
               })));
  }

  public updateProfile(updateUserData: IUpdateProfileRequest): Observable<IProfile> {
    return this.http.put<IProfile>(`${this.api}Users/UpdateProfile`, { ...updateUserData })
  }
}

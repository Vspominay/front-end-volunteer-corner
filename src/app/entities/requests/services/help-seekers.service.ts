import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IHelpRequest } from '../interfaces/help-request.interface';
import { IHelpSeeker } from '../interfaces/help-seeker.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpSeekersService {

  private readonly api = environment.requestsApi;

  constructor(private http: HttpClient) { }

  public getHelpSeekers(search?: string, isApproved?: boolean): Observable<IHelpSeeker[]> {
    return this.http.get<IHelpSeeker[]>(`${this.api}HelpSeekers?SearchString=${search}&IsApproved=${isApproved}`);
  }

  public getHelpSeekerInformation(id: string): Observable<IHelpSeeker> {
    return this.http.get<IHelpSeeker>(`${this.api}HelpSeekers/${id}`);
  }

  public getOwnHelpRequests(): Observable<IHelpRequest[]> {
    return this.http.get<IHelpRequest[]>(`${this.api}HelpSeekers/GetOwnHelpRequests`);
  }

  public getOwnHelpRequestInformation(id: string): Observable<IHelpRequest> {
    return this.http.get<IHelpRequest>(`${this.api}HelpSeekers/GetOwnHelpRequests/${id}`);
  }
}

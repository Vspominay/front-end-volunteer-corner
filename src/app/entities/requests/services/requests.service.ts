import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";
import { ERequestStatus } from "../enums/request-status.enum";
import { IHelpRequest } from "../interfaces/help-request.interface";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private readonly api = environment.api;

  constructor(private http: HttpClient) { }

  public getHelpRequests(search?: string, status?: ERequestStatus, startDate?: string, endDate?: string): Observable<IHelpRequest[]> {
    return this.http.get<IHelpRequest[]>(`${this.api}HelpRequests`, {
      params: {
        Search: search || '',
        Status: status || '',
        StartDate: startDate || '',
        EndDate: endDate || ''
      }
    });
  }

  public getRequest(id: string): Observable<IHelpRequest> {
    return this.http.get<IHelpRequest>(`${this.api}HelpRequest/${id}`);
  }

  public createRequest(ownerId: string, title: string, description: string): Observable<IHelpRequest> {
    return this.http.post<IHelpRequest>(`${this.api}HelpRequests`, {
      OwnerId: ownerId,
      Name: title,
      Description: description
    })
  }

  public deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}HelpRequest/${id}`);
  }
}

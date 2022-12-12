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
        SearchString: search || '',
        Status: status || '',
        StartDate: startDate || '',
        EndDate: endDate || ''
      }
    });
  }

  public getRequest(id: string): Observable<IHelpRequest> {
    return this.http.get<IHelpRequest>(`${this.api}HelpRequests/${id}`);
  }

  public createRequest(title: string, location: string, description: string = ''): Observable<IHelpRequest> {
    const createFormData: FormData = new FormData();

    createFormData.append('Name', title);
    createFormData.append('location', location);
    createFormData.append('Description', description);

    return this.http.post<IHelpRequest>(`${this.api}HelpRequests`, createFormData);
  }

  public deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}HelpRequest/${id}`);
  }

  public updateHelpRequest(id: string, name?: string, description?: string, location?: string) {
    return this.http.put<IHelpRequest>(`${this.api}HelpRequests/${id}`, {
      name, description, location
    });
  }

  public changeRequestStatus(id: number, status: ERequestStatus) {
    return this.http.patch(`${this.api}HelpRequests${id}`, { NewStatus: status });
  }

  public uploadRequestDocuments(id: number, documents: File[]) {
    const documentFormData = new FormData();

    for (const document of documents) {
      documentFormData.append('', document);
    }

    return this.http.patch((`${this.api}HelpRequests/${id}`), documentFormData);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ERequestStatus } from '../enums/request-status.enum';
import { IHelpRequest } from '../interfaces/help-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private readonly api = environment.requestsApi;

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
    return this.http.get<Omit<IHelpRequest, 'additionalDocuments'> & { additionalDocuments: { filePath: string }[] }>(`${this.api}HelpRequests/${id}`)
               .pipe(map(requests => {
                 return {
                   ...requests,
                   additionalDocuments: requests.additionalDocuments.map(document => {
                     return {
                       fileName: document.filePath.slice(document.filePath.lastIndexOf('/') + 1),
                       filePath: document.filePath
                     }
                   })
                 }
               }));
  }

  public createRequest(title: string, location: string, description: string = ''): Observable<IHelpRequest> {
    const createFormData: FormData = new FormData();

    createFormData.append('Name', title);
    createFormData.append('location', location);
    createFormData.append('Description', description);

    return this.http.post<IHelpRequest>(`${this.api}HelpRequests`, createFormData);
  }

  public deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}HelpRequests/${id}`);
  }

  public updateHelpRequest(id: string, name?: string, description?: string, location?: string) {
    return this.http.put<IHelpRequest>(`${this.api}HelpRequests/${id}`, {
      name, description, location
    });
  }

  public changeRequestStatus(id: string, status: ERequestStatus): Observable<ERequestStatus> {
    return this.http.patch<ERequestStatus>(`${this.api}HelpRequests/${id}/ChangeStatus`, { newStatus: status });
  }

  public uploadRequestDocuments(id: string, document: File) {
    const documentFormData = new FormData();
    documentFormData.append('', document);

    return this.http.patch((`${this.api}HelpRequests/${id}/AddDocuments`), documentFormData);
  }

  public createResponse(id: string, comment: string): Observable<IHelpRequest> {
    return this.http.post<IHelpRequest>(`${this.api}HelpRequests/${id}/responses`, { comment });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ERequestStatus } from '../../requests/enums/request-status.enum';
import { IProposal } from '../interfaces/proposal.interface';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  private readonly api = environment.proposalsApi

  constructor(private http: HttpClient) { }

  public getProposals(): Observable<IProposal[]> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*'
      }
    )

    return this.http.get<IProposal[]>(`${this.api}proposals`, { headers }
    );
  }

  public getProposal(id: string): Observable<IProposal> {
    return this.http.get<IProposal>(`${this.api}proposals/${id}`)
  }

  public createProposal(title: string, location: string, description: string = '') {
    const createFormData: FormData = new FormData();

    createFormData.append('name', title);
    createFormData.append('description', description);
    createFormData.append('location', location);
    createFormData.append('ownerId', title);

    return this.http.post<IProposal>(`${this.api}create`, createFormData);
  }

  public updateProposal(id: string, name?: string, description?: string, location?: string): Observable<IProposal> {
    return this.http.put<IProposal>(`${this.api}proposals/${id}`, {
      name, description, location
    });
  }

  public changeProposalStatus(id: string, status: ERequestStatus): Observable<ERequestStatus> {
    return this.http.post<ERequestStatus>(`${this.api}proposals/${id}/${status === ERequestStatus.Canceled ? 'cancel' : 'close'}`, {});
  }
}

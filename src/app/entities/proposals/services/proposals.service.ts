import { HttpClient } from '@angular/common/http';
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
    return this.http.get<IProposal[]>(`${this.api}proposals`);
  }

  public getProposal(id: string): Observable<IProposal> {
    return this.http.get<IProposal>(`${this.api}proposals/${id}`)
  }

  public createProposal(title: string, location: string, description: string = '') {
    return this.http.post<IProposal>(`${this.api}proposals/create`, {
      name: title,
      description,
      location,
      ownerId: '7a9a250a-70de-492c-a3cc-2766d8ed0ebb'
    });
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

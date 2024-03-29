import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubmitProposal } from '../_models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }

  submitProposal(proposal: SubmitProposal) {
    return this.http.post<void>(`${environment.serverUrl}/proposals`, proposal);
  }

  cancelProposal(id: number, cancelTransportProposal = false) {
    return this.http.patch<void>(`${environment.serverUrl}/proposals/${id}/cancel`, cancelTransportProposal);
  }

  chooseProposal(id: number) {
    return this.http.patch<void>(`${environment.serverUrl}/proposals/${id}/choose`, {});
  }
}

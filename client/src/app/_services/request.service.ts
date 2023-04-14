import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequest } from '../_models/create-request.model';
import { environment } from 'src/environments/environment';
import { RequestModel } from '../_models/request.model';
import { EditRequest } from '../_models/edit-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  createRequest(createRequest: CreateRequest) {
    return this.http.post<number>(`${environment.serverUrl}/requests`, createRequest);
  }

  getCompanyRequests() {
    return this.http.get<RequestModel[]>(`${environment.serverUrl}/requests`);
  }

  editRequest(data: EditRequest) {
    return this.http.put<number>(`${environment.serverUrl}/requests/${data.id}`, data);
  }
}

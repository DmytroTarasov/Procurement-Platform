import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCompanyRequests(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page) {
      params = params.append('pageNumber', page);
    }
    if (itemsPerPage) {
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<RequestModel[]>(`${environment.serverUrl}/requests`, { observe: 'response', params });
  }

  editRequest(data: EditRequest) {
    return this.http.put<number>(`${environment.serverUrl}/requests/${data.id}`, data);
  }

  cancelRequest(id: number) {
    return this.http.put<number>(`${environment.serverUrl}/requests/${id}/cancel`, {});
  }
}

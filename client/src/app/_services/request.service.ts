import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequest } from '../_models/create-request.model';
import { environment } from 'src/environments/environment';
import { RequestModel } from '../_models/request.model';
import { EditRequest } from '../_models/edit-request.model';
import { RequestParams } from '../_models/request-params.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  createRequest(createRequest: CreateRequest) {
    return this.http.post<number>(`${environment.serverUrl}/requests`, createRequest);
  }

  getCompanyRequests(page?: number, requestParams?: RequestParams) {
    let params = new HttpParams();
    if (page) {
      params = params.append('pageNumber', page);
    }
    if (requestParams) {
      params = params.append('status', requestParams.status);
      params = params.append('goodTitle', requestParams.goodTitle);
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

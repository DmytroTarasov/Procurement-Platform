import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(title: string, requestIds: number[]) {
    return this.http.post<number>(`${environment.serverUrl}/orders`, { title, requestIds });
  }

  getOrders(page?: number) {
    let params = new HttpParams();
    if (page) {
      params = params.append('pageNumber', page);
    }
    // if (requestParams) {
    //   params = params.append('status', requestParams.status);
    //   params = params.append('goodTitle', requestParams.goodTitle);
    // }
    return this.http.get<Order[]>(`${environment.serverUrl}/orders`, { observe: 'response', params });
  }
}

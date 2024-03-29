import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order.model';
import { OrderParams } from '../_models/order-params.model';
import { CreateOrder } from '../_models/create-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: CreateOrder) {
    return this.http.post<void>(`${environment.serverUrl}/orders`, order);
  }

  getOrders(page?: number, orderParams?: OrderParams) {
    const params = this.createOrderParams(page, orderParams);
    return this.http.get<Order[]>(`${environment.serverUrl}/orders`, { observe: 'response', params });
  }

  cancelOrder(id: number) {
    return this.http.patch<void>(`${environment.serverUrl}/orders/${id}/cancel`, {});
  }

  getOrderDetails(id: number) {
    return this.http.get<Order>(`${environment.serverUrl}/orders/${id}`);
  }

  private createOrderParams(page?: number, orderParams?: OrderParams) {
    let params = new HttpParams();
    params = page ? params.append('pageNumber', page) : params;
    if (!orderParams) return params;
    params = orderParams.status ? params.append('status', orderParams.status) : params;
    params = orderParams.companyOrders ? params.append('companyOrders', orderParams.companyOrders) : params;
    return params;
  }
}

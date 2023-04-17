import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrder } from '../_models/create-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(title: string, requestIds: number[]) {
    return this.http.post<number>(`${environment.serverUrl}/orders`, { title, requestIds });
  }
}

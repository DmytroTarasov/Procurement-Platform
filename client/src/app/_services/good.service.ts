import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Good } from '../_models/good.model';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  constructor(private http: HttpClient) { }

  getGoods() {
    return this.http.get<Good[]>(`${environment.serverUrl}/goods`);
  }
}

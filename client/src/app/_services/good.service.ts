import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Good } from '../_models/good.model';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  constructor(private http: HttpClient) { }

  getGoods(categoryTitle?: string) {
    const params = this.createGoodParams(categoryTitle);
    return this.http.get<Good[]>(`${environment.serverUrl}/goods`, { params });
  }

  private createGoodParams(categoryTitle?: string) {
    let params = new HttpParams();
    params = categoryTitle ? params.append('categoryTitle', categoryTitle) : params;
    return params;
  }
}

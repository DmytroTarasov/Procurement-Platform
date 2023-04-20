import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcurementItem } from '../_models/procurement-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProcurementItemService {

  constructor(private http: HttpClient) { }

  getProcurementItems(categoryTitle?: string) {
    const params = this.createProcurementItemParams(categoryTitle);
    return this.http.get<ProcurementItem[]>(`${environment.serverUrl}/procurementItems`, { params });
  }

  private createProcurementItemParams(categoryTitle?: string) {
    let params = new HttpParams();
    params = categoryTitle ? params.append('categoryTitle', categoryTitle) : params;
    return params;
  }
}

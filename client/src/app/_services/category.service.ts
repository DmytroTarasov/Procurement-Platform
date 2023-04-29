import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${environment.serverUrl}/categories`);
  }

  createCategory(title: string, type: string) {
    return this.http.post<void>(`${environment.serverUrl}/categories`, { title, type });
  }
}

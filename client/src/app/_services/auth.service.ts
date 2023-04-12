import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { Login } from '../_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post<User>(`${environment.serverUrl}/account/register`, user);
  }

  login(data: Login) {
    return this.http.post<User>(`${environment.serverUrl}/account/login`, data);
  }
}

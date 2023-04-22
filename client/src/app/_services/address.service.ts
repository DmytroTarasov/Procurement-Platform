import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../_models/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getCompanyOrderAddresses() {
    return this.http.get<Address[]>(`${environment.serverUrl}/addresses`);
  }
}

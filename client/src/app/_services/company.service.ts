import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company.model';
import { Subdivision } from '../_models/subdivision.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getAllCompanies() {
    return this.http.get<Company[]>(`${environment.serverUrl}/companies`);
  }

  createCompany(company: Company) {
    return this.http.post<number>(`${environment.serverUrl}/companies`, company);
  }

  createCompanySubdivision(companyId: number, subdivision: Subdivision) {
    return this.http.post<number>(`${environment.serverUrl}/companies/${companyId}/subdivisions`, subdivision);
  }
}

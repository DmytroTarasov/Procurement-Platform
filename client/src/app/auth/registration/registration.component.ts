import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/_models/company.model';
import { Role } from 'src/app/_models/role.model';
import { Subdivision } from 'src/app/_models/subdivision.model';
import { CompanyService } from 'src/app/_services/company.service';
import { RoleService } from 'src/app/_services/role.service';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectRoles, selectCompanies, selectCompanySubdivisions, selectError } from '../store/auth.selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  roles$: Observable<Role[]>;
  companies$: Observable<Company[]>;
  subdivisions$: Observable<Subdivision[]>;
  search: string;
  registrationError$: Observable<string>;

  constructor(
    private roleService: RoleService,
    private companyService: CompanyService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.getRoles());
    this.store.dispatch(AuthActions.getCompanies());

    this.userForm = new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+\\.[a-z]{2,4}$')
      ]),
      role: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required),
      subdivisionId: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
      ])
    });

    this.roles$ = this.store.pipe(select(selectRoles));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.subdivisions$ = this.store.pipe(select(selectCompanySubdivisions));
    this.registrationError$ = this.store.pipe(select(selectError));

    this.getFormControl('companyId').valueChanges.subscribe(id => {
      this.store.dispatch(AuthActions.setSelectedCompany({ id }));
    });
    // this.roleService.getAllRoles().subscribe(roles => this.roles = roles);
    // this.companyService.getAllCompanies().subscribe(companies => this.companies = companies);

    this.store.dispatch(AuthActions.openModal());
  }

  getFormControl(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }

  getSelectedCompanySubdivisions(): Subdivision[] {
    // return this.getFormControl('company').value
    //   ? this.companies.find(c => c.id === this.getFormControl('company').value).subdivisions
    //   : [];
    return [];
  }

  onSubmit() {
    if (!this.userForm.valid) return;

    const { companyId, ...user } = this.userForm.value;
    this.store.dispatch(AuthActions.register({ user }));
  }

  // getFilteredCompanies() {
  //   console.log(this.search);
  //   return this.search
  //   ? this.companies.filter(c => c.title.toLowerCase().includes(this.search.toLowerCase()))
  //   : this.companies;
  // }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/_models/company.model';
import { Role } from 'src/app/_models/role.model';
import { Subdivision } from 'src/app/_models/subdivision.model';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.clearError());
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
    this.registrationError$ = this.store.pipe(select(selectError));

    this.getFormControl('companyId').valueChanges.subscribe(id => {
      this.subdivisions$ = this.store.pipe(select(selectCompanySubdivisions(id)));
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.userForm.valid) return;

    this.store.dispatch(AuthActions.register({ user: this.userForm.value }));
  }

  openCreateCompanyDialog() {
    this.store.dispatch(DialogActions.openCreateCompanyDialog());
  }

  openCreateSubdivisionDialog() {
    const companyIdControl = this.getFormControl('companyId');
    companyIdControl.markAsTouched();

    if (companyIdControl.valid) {
      this.store.dispatch(DialogActions.openCreateSubdivisionDialog({ companyId: companyIdControl.value }));
    }
  }
}

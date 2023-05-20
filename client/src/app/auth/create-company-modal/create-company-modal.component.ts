import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectError } from '../store/auth.selectors';
import { Observable } from 'rxjs';
import {
  getEmailValidators,
  getCityValidators,
  getRegionValidators,
  getStreetValidators,
  getZipCodeValidators
} from 'src/app/core/resources/validators';

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.scss']
})
export class CreateCompanyModalComponent implements OnInit {
  companyForm: FormGroup;
  error$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      edrpou: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d{8}')
      ]),
      email: new FormControl('', getEmailValidators()),
      city: new FormControl('', getCityValidators()),
      region: new FormControl(null, getRegionValidators()),
      street: new FormControl('', getStreetValidators()),
      buildingNumber: new FormControl(null, Validators.maxLength(5)),
      zipCode: new FormControl('', getZipCodeValidators())
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.companyForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.companyForm.valid) return;

    const { title, edrpou, email, ...address } = this.companyForm.value;
    this.store.dispatch(AuthActions.createCompany({ company: { title, edrpou, email, address } }));
  }
}

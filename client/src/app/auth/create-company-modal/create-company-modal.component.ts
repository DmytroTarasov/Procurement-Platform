import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectError } from '../store/auth.selectors';
import { Observable } from 'rxjs';

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
      title: new FormControl('', Validators.required),
      edrpou: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
      city: new FormControl('', Validators.required),
      region: new FormControl(''),
      street: new FormControl('', Validators.required),
      buildingNumber: new FormControl(''),
      zipCode: new FormControl('', Validators.required)
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.companyForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.companyForm.valid) return;

    const { title, edrpou, ...address } = this.companyForm.value;

    this.store.dispatch(AuthActions.createCompany({ company: { title, edrpou, address } }));
  }

}

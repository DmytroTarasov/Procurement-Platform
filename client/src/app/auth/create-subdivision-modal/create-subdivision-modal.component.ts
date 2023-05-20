import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectError } from '../store/auth.selectors';
import {
  getCityValidators,
  getRegionValidators,
  getStreetValidators,
  getZipCodeValidators
} from 'src/app/core/resources/validators';

export interface CreateSubdivisionModalData {
  companyId: number;
}

@Component({
  selector: 'app-create-subdivision-modal',
  templateUrl: './create-subdivision-modal.component.html',
  styleUrls: ['./create-subdivision-modal.component.scss']
})
export class CreateSubdivisionModalComponent implements OnInit {
  subdivisionForm: FormGroup;
  error$: Observable<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CreateSubdivisionModalData, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subdivisionForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      city: new FormControl('', getCityValidators()),
      region: new FormControl(null, getRegionValidators()),
      street: new FormControl('', getStreetValidators()),
      buildingNumber: new FormControl(null, Validators.maxLength(5)),
      zipCode: new FormControl('', getZipCodeValidators())
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.subdivisionForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.subdivisionForm.valid) return;

    const { title, ...address } = this.subdivisionForm.value;
    this.store.dispatch(AuthActions.createSubdivision({ subdivision: { title, address }, companyId: this.data.companyId }));
  }
}

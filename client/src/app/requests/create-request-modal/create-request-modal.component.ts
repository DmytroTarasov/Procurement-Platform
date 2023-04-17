import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Good } from 'src/app/_models/good.model';
import { selectError } from '../store/requests.selectors';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { selectGoods, selectCategories } from '../store/requests.selectors';
import { Category } from 'src/app/_models/category.model';
import { measurementUnits } from 'src/app/_models/resources/measurement-units';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: ['./create-request-modal.component.scss']
})
export class CreateRequestModalComponent implements OnInit {
  requestForm: FormGroup;
  goods$: Observable<Good[]>;
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  goodExists = true;
  measurementUnits = measurementUnits;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getGoods());

    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.required),
      goodId: new FormControl('', this.goodExists ? Validators.required : null),
      title: new FormControl('', !this.goodExists ? Validators.required : null),
      categoryId: new FormControl('', !this.goodExists ? Validators.required : null),
      quantity: new FormControl('', Validators.required),
      measurementUnit: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
    });

    this.goods$ = this.store.pipe(select(selectGoods));
    this.categories$ = this.store.pipe(select(selectCategories));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.requestForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.requestForm.valid) return;

    const { title, categoryId, ...request } = this.requestForm.value;
    request.goodId = this.goodExists ? request.goodId : 0;
    const good = !this.goodExists ? { title, categoryId } : null;

    this.store.dispatch(RequestsActions.createRequest({ createRequest: { request, good }}));
  }

  toggleGoodExistence() {
    this.goodExists = !this.goodExists;

    const controlsToUpdate = {
      title: this.goodExists ? [] : [Validators.required],
      categoryId: this.goodExists ? [] : [Validators.required],
      goodId: this.goodExists ? [Validators.required] : []
    };

    for (const controlName in controlsToUpdate) {
      const control = this.getFormControl(controlName);
      control.setValidators(controlsToUpdate[controlName]);
      // control.setValue(control.value);
      control.updateValueAndValidity();
    }

    if (!this.goodExists) this.store.dispatch(RequestsActions.getCategories());
  }
}

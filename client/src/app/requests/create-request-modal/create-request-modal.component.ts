import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProcurementItem } from 'src/app/_models/procurement-item.model';
import { selectError } from '../store/requests.selectors';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { selectProcurementItems, selectCategories } from 'src/app/categories/store/categories.selectors';
import { Category } from 'src/app/_models/category.model';
import { measurementUnits } from 'src/app/core/resources/measurement-units';
import * as CategoriesActions from 'src/app/categories/store/categories.actions';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: ['./create-request-modal.component.scss']
})
export class CreateRequestModalComponent implements OnInit {
  requestForm: FormGroup;
  procurementItems$: Observable<ProcurementItem[]>;
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  procurementItemExists = true;
  measurementUnits = measurementUnits;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(CategoriesActions.getProcurementItems({}));

    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.required),
      procurementItemId: new FormControl('', this.procurementItemExists ? Validators.required : null),
      title: new FormControl('', !this.procurementItemExists ? Validators.required : null),
      categoryId: new FormControl('', !this.procurementItemExists ? Validators.required : null),
      quantity: new FormControl('', Validators.required),
      measurementUnit: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
    });

    this.procurementItems$ = this.store.pipe(select(selectProcurementItems));
    this.categories$ = this.store.pipe(select(selectCategories));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.requestForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.requestForm.valid) return;

    const { title, categoryId, ...request } = this.requestForm.value;
    request.procurementItemId = this.procurementItemExists ? request.procurementItemId : 0;
    const procurementItem = !this.procurementItemExists ? { title, categoryId } : null;

    this.store.dispatch(RequestsActions.createRequest({ createRequest: { request, procurementItem }}));
  }

  toggleProcurementItemExistence() {
    this.procurementItemExists = !this.procurementItemExists;

    const controlsToUpdate = {
      title: this.procurementItemExists ? [] : [Validators.required],
      categoryId: this.procurementItemExists ? [] : [Validators.required],
      procurementItemId: this.procurementItemExists ? [Validators.required] : []
    };

    for (const controlName in controlsToUpdate) {
      const control = this.getFormControl(controlName);
      control.setValidators(controlsToUpdate[controlName]);
      control.updateValueAndValidity();
    }

    if (!this.procurementItemExists) this.store.dispatch(CategoriesActions.getCategories());
  }
}

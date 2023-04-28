import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { selectError } from '../store/categories.selectors';
import { CategoryTypes } from 'src/app/core/resources/category-types';
import * as CategoriesActions from '../store/categories.actions';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent implements OnInit {
  categoryForm: FormGroup;
  error$: Observable<string>;
  categoryTypes = Object.keys(CategoryTypes).map(key => {
    return { key: CategoryTypes[key], value: key }
  });

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      categoryType: new FormControl(this.categoryTypes[0].value, Validators.required)
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.categoryForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.categoryForm.valid) return;

    this.store.dispatch(CategoriesActions.createCategory(this.categoryForm.value));
  }
}

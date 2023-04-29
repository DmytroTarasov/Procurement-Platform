import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/_models/category.model';
import * as CategoriesActions from '../store/categories.actions';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { selectCategories } from '../store/categories.selectors';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import { CategoryTypes, CategoryTypesColors } from 'src/app/core/resources/category-types';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories$: Observable<Category[]>;
  CategoryTypes = CategoryTypes;
  CategoryTypesColors = CategoryTypesColors;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(CategoriesActions.getCategories());
    this.categories$ = this.store.pipe(select(selectCategories));
  }

  openCreateCategoryDialog() {
    this.store.dispatch(DialogActions.openCreateCategoryDialog());
  }
}

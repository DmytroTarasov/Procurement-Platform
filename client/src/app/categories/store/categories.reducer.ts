import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { ProcurementItem } from 'src/app/_models/procurement-item.model';
import { Category } from 'src/app/_models/category.model';

export interface State {
  procurementItems: ProcurementItem[] | null;
  categories: Category[] | null;
  error: string | null;
}

export const initialState: State = {
  procurementItems: null,
  categories: null,
  error: null
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.setCategories, (state, { categories }) => ({ ...state, categories: [...categories] })),
  on(CategoriesActions.setProcurementItems, (state, { procurementItems }) => ({ ...state, procurementItems: [...procurementItems] })),
  on(CategoriesActions.clearState, (state) => ({ ...initialState })),
  on(CategoriesActions.failure, (state, { error }) => ({ ...state, error })),
);

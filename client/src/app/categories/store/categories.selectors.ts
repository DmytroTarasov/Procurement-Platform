import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<State>('categories');

export const selectCategories = createSelector(
  selectCategoriesState,
  (state: State) => state.categories
);

export const selectProcurementItems = createSelector(
  selectCategoriesState,
  (state: State) => state.procurementItems
);

export const selectError = createSelector(
  selectCategoriesState,
  (state: State) => state.error
);

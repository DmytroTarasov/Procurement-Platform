import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './requests.reducer';

export const selectRequestsState = createFeatureSelector<State>('requests');

export const selectGoods = createSelector(
  selectRequestsState,
  (state: State) => state.goods
);

export const selectCategories = createSelector(
  selectRequestsState,
  (state: State) => state.categories
);

export const selectCompanyRequests = createSelector(
  selectRequestsState,
  (state: State) => state.requests
);

export const selectPagination = createSelector(
  selectRequestsState,
  (state: State) => state.pagination
);

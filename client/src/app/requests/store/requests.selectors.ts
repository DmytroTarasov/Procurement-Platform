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

export const selectRequestParams = createSelector(
  selectRequestsState,
  (state: State) => state.requestParams
);

export const selectOrderRequests = createSelector(
  selectRequestsState,
  (state: State) => state.orderRequests
);

export const selectError = createSelector(
  selectRequestsState,
  (state: State) => state.error
);

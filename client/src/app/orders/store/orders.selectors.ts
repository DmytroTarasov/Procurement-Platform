import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<State>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  (state: State) => state.orders
);

export const selectPagination = createSelector(
  selectOrdersState,
  (state: State) => state.pagination
);

export const selectOrderParams = createSelector(
  selectOrdersState,
  (state: State) => state.orderParams
);

export const selectError = createSelector(
  selectOrdersState,
  (state: State) => state.error
);

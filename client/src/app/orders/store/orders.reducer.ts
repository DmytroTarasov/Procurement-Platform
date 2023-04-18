import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Pagination } from 'src/app/_models/pagination.model';
import { Order } from 'src/app/_models/order.model';
// import { RequestParams } from 'src/app/_models/request-params.model';

export interface State {
  orders: Order[] | null;
  pagination: Pagination;
  error: string | null;
}

export const initialState: State = {
  orders: null,
  pagination: null,
  error: null
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.setOrders, (state, { orders, pagination }) => ({ ...state, orders: [...orders],
    pagination: {...pagination} })),
  on(OrdersActions.failure, (state, { error }) => ({ ...state, error })),
);

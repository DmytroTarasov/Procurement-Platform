import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Pagination } from 'src/app/_models/pagination.model';
import { Order } from 'src/app/_models/order.model';
import { OrderParams } from 'src/app/_models/order-params.model';

export interface State {
  orders: Order[] | null;
  pagination: Pagination;
  orderParams: OrderParams;
  error: string | null;
}

export const initialState: State = {
  orders: null,
  pagination: null,
  orderParams: new OrderParams(),
  error: null
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.setOrders, (state, { orders, pagination }) => ({ ...state, orders: [...orders],
    pagination: {...pagination} })),
  on(OrdersActions.setOrderParams, (state, { orderParams }) => ({ ...state, orderParams: {...orderParams} })),
  on(OrdersActions.clearState, (state) => ({ ...initialState })),
  on(OrdersActions.failure, (state, { error }) => ({ ...state, error })),
);

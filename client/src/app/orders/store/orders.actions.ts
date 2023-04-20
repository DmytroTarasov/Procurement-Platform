import { createAction, props } from '@ngrx/store';
import { OrderParams } from 'src/app/_models/order-params.model';
import { Order } from 'src/app/_models/order.model';
import { Pagination } from 'src/app/_models/pagination.model';
import { RequestParams } from 'src/app/_models/request-params.model';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ title: string }>()
);
export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{
    data: ModalRedirectData;
    pageNumber?: number;
    requestParams?: RequestParams;
  }>()
);
export const getOrders = createAction(
  '[Orders] Get Orders',
  props<{ pageNumber?: number, orderParams?: OrderParams }>()
);
export const setOrders = createAction(
  '[Orders] Set Orders',
  props<{ orders: Order[]; pagination: Pagination }>()
);
export const cancelOrder = createAction(
  '[Orders] Cancel Order',
  props<{ id: number }>()
);
export const cancelOrderSuccess = createAction(
  '[Orders] Cancel Order Success',
  props<{ id: number; pageNumber?: number; orderParams?: OrderParams }>()
);
export const failure = createAction(
  '[Orders] Failure',
  props<{ error: string }>()
);
export const setOrderParams = createAction(
  '[Orders] Set Order Params',
  props<{ orderParams: OrderParams }>()
);
export const clearState = createAction(
  '[Orders] Clear State'
);

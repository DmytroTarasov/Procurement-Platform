import { createAction, props } from '@ngrx/store';
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
  props<{ pageNumber?: number }>()
);
export const setOrders = createAction(
  '[Orders] Set Orders',
  props<{ orders: Order[]; pagination: Pagination }>()
);
export const failure = createAction(
  '[Orders] Failure',
  props<{ error: string }>()
);

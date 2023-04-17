import { createAction, props } from '@ngrx/store';
import { CreateOrder } from 'src/app/_models/create-order.model';
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
export const failure = createAction(
  '[Requests] Failure',
  props<{ error: string }>()
);

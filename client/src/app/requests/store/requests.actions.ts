import { createAction, props } from '@ngrx/store';
import { CreateRequest } from 'src/app/_models/create-request.model';
import { EditRequest } from 'src/app/_models/edit-request.model';
import { Pagination } from 'src/app/_models/pagination.model';
import { RequestParams } from 'src/app/_models/request-params.model';
import { RequestModel } from 'src/app/_models/request.model';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';

export const createRequest = createAction(
  '[Requests] Create Request',
  props<{ createRequest: CreateRequest }>()
);
export const setCompanyRequests = createAction(
  '[Requests] Set Company Requests',
  props<{ requests: RequestModel[]; pagination: Pagination }>()
);
export const editRequest = createAction(
  '[Requests] Edit Request',
  props<{ data: EditRequest }>()
);
export const cancelRequest = createAction(
  '[Requests] Cancel Request',
  props<{ id: number }>()
);
export const failure = createAction(
  '[Requests] Failure',
  props<{ error: string }>()
);
export const createRequestSuccess = createAction(
  '[Requests] Create Request Success',
  props<{ data: ModalRedirectData; pageNumber?: number; requestParams?: RequestParams }>()
);
export const noAction = createAction('[Requests] No Action');
export const getCompanyRequests = createAction(
  '[Requests] Get Company Requests',
  props<{ pageNumber?: number; requestParams?: RequestParams }>()
);
export const editRequestSuccess = createAction(
  '[Requests] Edit Request Success',
  props<{ data: ModalRedirectData; pageNumber?: number; requestParams?: RequestParams }>()
);
export const cancelRequestSuccess = createAction(
  '[Requests] Cancel Request Success',
  props<{ pageNumber?: number; requestParams?: RequestParams }>()
);
export const setRequestParams = createAction(
  '[Requests] Set Request Params',
  props<{ requestParams: RequestParams }>()
);
export const clearState = createAction(
  '[Requests] Clear State'
);
export const addRequestToOrder = createAction(
  '[Requests] Add Request To Order',
  props<{ id: number }>()
);
export const deleteRequestFromOrder = createAction(
  '[Requests] Delete Request From Order',
  props<{ id: number }>()
);
export const clearOrderRequests = createAction(
  '[Requests] Clear Order Requests'
);

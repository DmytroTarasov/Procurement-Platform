import { createReducer, on } from '@ngrx/store';
import * as RequestsActions from './requests.actions';
import { RequestModel } from 'src/app/_models/request.model';
import { Pagination } from 'src/app/_models/pagination.model';
import { RequestParams } from 'src/app/_models/request-params.model';

export interface State {
  requests: RequestModel[] | null;
  pagination: Pagination;
  requestParams: RequestParams;
  orderRequests: number[];
  error: string | null;
}

export const initialState: State = {
  requests: null,
  pagination: null,
  orderRequests: [],
  requestParams: new RequestParams(),
  error: null
};

export const requestsReducer = createReducer(
  initialState,
  on(RequestsActions.setCompanyRequests, (state, { requests, pagination }) => ({ ...state, requests: [...requests],
    pagination: {...pagination} })),
  on(RequestsActions.setRequestParams, (state, { requestParams }) => ({ ...state, requestParams: {...requestParams} })),
  on(RequestsActions.clearState, (state) => ({ ...initialState })),
  on(RequestsActions.addRequestToOrder, (state, { id }) => ({ ...state, orderRequests: [...state.orderRequests, id] })),
  on(RequestsActions.deleteRequestFromOrder, (state, { id }) => ({ ...state, orderRequests: state.orderRequests.filter(r => r !== id) })),
  on(RequestsActions.clearOrderRequests, (state) => ({ ...state, orderRequests: [] })),
  on(RequestsActions.failure, (state, { error }) => ({ ...state, error }))
);

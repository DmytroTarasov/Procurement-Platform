import { createReducer, on } from '@ngrx/store';
import * as RequestsActions from './requests.actions';
import { Good } from 'src/app/_models/good.model';
import { Category } from 'src/app/_models/category.model';
import { RequestModel } from 'src/app/_models/request.model';
import { Pagination } from 'src/app/_models/pagination.model';

export interface State {
  goods: Good[] | null;
  categories: Category[] | null;
  requests: RequestModel[] | null;
  pagination: Pagination;
  error: string | null;
}

export const initialState: State = {
  goods: null,
  categories: null,
  requests: null,
  pagination: null,
  error: null
};

export const requestsReducer = createReducer(
  initialState,
  on(RequestsActions.setGoods, (state, { goods }) => ({ ...state, goods: [...goods] })),
  on(RequestsActions.setCategories, (state, { categories }) => ({ ...state, categories: [...categories] })),
  on(RequestsActions.setCompanyRequests, (state, { requests, pagination }) => ({ ...state, requests: [...requests],
    pagination: {...pagination} })),
  on(RequestsActions.cancelRequestSuccess, (state, { id }) => {
    const requestToUpdate = state.requests.find(r => r.id === id);
    const updatedRequest = { ...requestToUpdate, status: 'Cancelled' };
    const updatedRequestIndex = state.requests.indexOf(requestToUpdate);
    const updatedRequests = [
      ...state.requests.slice(0, updatedRequestIndex),
      updatedRequest,
      ...state.requests.slice(updatedRequestIndex + 1),
    ];
    return {
      ...state,
      requests: updatedRequests
    };
  }),
  on(RequestsActions.failure, (state, { error }) => ({ ...state, error })),
);

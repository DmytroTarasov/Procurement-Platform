import { createReducer, on } from '@ngrx/store';
import * as RequestsActions from './requests.actions';
import { Good } from 'src/app/_models/good.model';
import { Category } from 'src/app/_models/category.model';

export interface State {
  goods: Good[] | null;
  categories: Category[] | null;
  error: string | null;
}

export const initialState: State = {
  goods: null,
  categories: null,
  error: null
};

export const requestsReducer = createReducer(
  initialState,
  on(RequestsActions.setGoods, (state, { goods }) => ({ ...state, goods: [...goods] })),
  on(RequestsActions.setCategories, (state, { categories }) => ({ ...state, categories: [...categories] })),
  // on(RequestsActions.failure, (state, { error }) => ({ ...state, error })),
);

import { createReducer, on } from '@ngrx/store';
import * as SpinnerActions from '../actions/spinner.actions';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

export const spinnerReducer = createReducer(
  initialState,
  on(SpinnerActions.showSpinner, (state) => ({...state, loading: true})),
  on(SpinnerActions.hideSpinner, (state) => ({...state, loading: false}))
);

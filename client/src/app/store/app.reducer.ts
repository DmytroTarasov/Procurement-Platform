import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSpinner from '../store/reducers/spinner.reducer';

export interface AppState {
  auth: fromAuth.State;
  spinner: fromSpinner.State
};

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  spinner: fromSpinner.spinnerReducer
};

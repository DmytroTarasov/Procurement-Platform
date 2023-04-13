import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSpinner from '../store/reducers/spinner.reducer';
import * as fromRequests from '../requests/store/requests.reducer';

export interface AppState {
  auth: fromAuth.State;
  spinner: fromSpinner.State,
  requests: fromRequests.State
};

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  spinner: fromSpinner.spinnerReducer,
  requests: fromRequests.requestsReducer
};

import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSpinner from '../store/reducers/spinner.reducer';
import * as fromRequests from '../requests/store/requests.reducer';
import * as fromOrders from '../orders/store/orders.reducer';
import * as fromCategories from '../categories/store/categories.reducer';

export interface AppState {
  auth: fromAuth.State;
  spinner: fromSpinner.State;
  requests: fromRequests.State;
  orders: fromOrders.State;
  categories: fromCategories.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  spinner: fromSpinner.spinnerReducer,
  requests: fromRequests.requestsReducer,
  orders: fromOrders.ordersReducer,
  categories: fromCategories.categoriesReducer
};

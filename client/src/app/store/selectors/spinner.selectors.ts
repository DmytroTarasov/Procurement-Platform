import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from '../reducers/spinner.reducer';

export const selectSpinnerState = createFeatureSelector<State>('spinner');

export const selectLoading = createSelector(
  selectSpinnerState,
  (state: State) => state.loading
);

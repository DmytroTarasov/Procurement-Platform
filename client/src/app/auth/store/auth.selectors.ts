import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectRoles = createSelector(
  selectAuthState,
  (state: State) => state.roles
)

export const selectCompanies = createSelector(
  selectAuthState,
  (state: State) => state.companies
)

export const selectCompanySubdivisions = (id: number) => createSelector(
  selectAuthState,
  (state: State) => state.companies ? state.companies.find(c => c.id === id).subdivisions : []
)

export const selectError = createSelector(
  selectAuthState,
  (state: State) => state.error
)

export const selectUser = createSelector(
  selectAuthState,
  (state: State) => state.user
)


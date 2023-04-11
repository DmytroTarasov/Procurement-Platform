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

export const selectCompanySubdivisions = createSelector(
  selectAuthState,
  (state: State) => state.selectedCompany ? state.selectedCompany.subdivisions : []
)

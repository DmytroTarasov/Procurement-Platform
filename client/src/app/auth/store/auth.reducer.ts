import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Role } from 'src/app/_models/role.model';
import { Company } from 'src/app/_models/company.model';

export interface State {
  roles: Role[] | null;
  companies: Company[] | null;
  selectedCompany: Company | null;
}

export const initialState: State = {
  roles: null,
  companies: null,
  selectedCompany: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setRoles, (state, { roles }) => ({ ...state, roles: [...roles] })),
  on(AuthActions.setCompanies, (state, { companies }) => ({ ...state, companies: [...companies] })),
  on(AuthActions.setSelectedCompany, (state, { id }) =>
    ({ ...state, selectedCompany: {...state.companies.find(c => c.id === id)}})),
);

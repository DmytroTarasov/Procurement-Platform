import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Role } from 'src/app/_models/role.model';
import { Company } from 'src/app/_models/company.model';
import { User } from 'src/app/_models/user.model';

export interface State {
  roles: Role[] | null;
  companies: Company[] | null;
  user: User | null;
  error: string | null;
}

export const initialState: State = {
  roles: null,
  companies: null,
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setRoles, (state, { roles }) => ({ ...state, roles: [...roles] })),
  on(AuthActions.setCompanies, (state, { companies }) => ({ ...state, companies: [...companies] })),
  on(AuthActions.registerSuccess, AuthActions.loginSuccess, (state, { user }) => ({ ...state, user: {...user}, error: null })),
  on(AuthActions.logout, (state) => ({ ...initialState })),
  on(AuthActions.failure, (state, { error }) => ({ ...state, error }))
);

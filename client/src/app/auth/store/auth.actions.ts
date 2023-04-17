import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/_models/company.model";
import { Login } from "src/app/_models/login.model";
import { Role } from "src/app/_models/role.model";
import { Subdivision } from "src/app/_models/subdivision.model";
import { User } from "src/app/_models/user.model";
import { ModalRedirectData } from "src/app/shared/_modals/modal-redirect/modal-redirect.component";

export const getRoles = createAction('[Auth] Get Roles');
export const getCompanies = createAction('[Auth] Get Companies');
export const setRoles = createAction('[Auth] Set Roles', props<{ roles: Role[]}>());
export const setCompanies = createAction('[Auth] Set Companies', props<{ companies: Company[] }>());
export const setSelectedCompany = createAction('[Auth] Set Selected Company', props<{ id: number }>());
export const register = createAction('[Auth] Register', props<{ user: any }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
// export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
export const createCompany = createAction('[Auth] Create Company', props<{ company: Company }>());
export const createCompanySuccess = createAction('[Auth] Create Company Success', props<{ data: ModalRedirectData }>());
// export const createCompanyFailure = createAction('[Auth] Create Company Failure', props<{ error: string }>());
export const createSubdivision = createAction('[Auth] Create Subdivision', props<{ subdivision: Subdivision, companyId: number }>());
export const createSubdivisionSuccess = createAction('[Auth] Create Subdivision Success', props<{ data: ModalRedirectData }>());
// export const createSubdivisionFailure = createAction('[Auth] Create Subdivision Failure', props<{ error: string }>());
export const login = createAction('[Auth] Login', props<{ login: Login }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User, redirect?: boolean }>());
export const autoLogin = createAction('[Auth] Auto Login');
export const logout = createAction('[Auth] Logout');
export const failure = createAction('[Auth] Failure', props<{ error: string }>());


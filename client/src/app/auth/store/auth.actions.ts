import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/_models/company.model";
import { Role } from "src/app/_models/role.model";
import { User } from "src/app/_models/user.model";

export const getRoles = createAction('[Auth] Get Roles');
export const getCompanies = createAction('[Auth] Get Companies');
export const setRoles = createAction('[Auth] Set Roles', props<{ roles: Role[]}>());
export const setCompanies = createAction('[Auth] Set Companies', props<{ companies: Company[] }>());
export const setSelectedCompany = createAction('[Auth] Set Selected Company', props<{ id: number }>());
export const register = createAction('[Auth] Register', props<{ user: any }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const openModal = createAction('[Auth] Open Modal');

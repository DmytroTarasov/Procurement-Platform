import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/_models/category.model";
import { CreateRequest } from "src/app/_models/create-request.model";
import { EditRequest } from "src/app/_models/edit-request.model";
import { Good } from "src/app/_models/good.model";
import { Pagination } from "src/app/_models/pagination.model";
import { RequestModel } from "src/app/_models/request.model";
import { ModalRedirectData } from "src/app/shared/_modals/modal-redirect/modal-redirect.component";

export const getGoods = createAction('[Requests] Get Goods');
export const setGoods = createAction('[Requests] Set Goods', props<{ goods: Good[]}>());
export const getCategories = createAction('[Requests] Get Categories');
export const setCategories = createAction('[Requests] Set Categories', props<{ categories: Category[]}>());

export const createRequest = createAction('[Requests] Create Request', props<{ createRequest: CreateRequest }>());

export const setCompanyRequests = createAction('[Requests] Set Company Requests', props<{ requests: RequestModel[],
  pagination: Pagination}>());

export const editRequest = createAction('[Requests] Edit Request', props<{ data: EditRequest }>());

export const cancelRequest = createAction('[Requests] Cancel Request', props<{ id: number }>());

export const failure = createAction('[Requests] Failure', props<{ error: string }>());

export const createRequestSuccess = createAction('[Requests] Create Request Success', props<{ data: ModalRedirectData, pageNumber?: number }>());
export const getCompanyRequests = createAction('[Requests] Get Company Requests', props<{ pageNumber?: number }>());
export const editRequestSuccess = createAction('[Requests] Edit Request Success', props<{ data: ModalRedirectData, pageNumber?: number }>());
export const cancelRequestSuccess = createAction('[Requests] Cancel Request Success', props<{ id: number, pageNumber?: number }>());

import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/_models/category.model";
import { CreateRequest } from "src/app/_models/create-request.model";
import { Good } from "src/app/_models/good.model";
import { ModalRedirectData } from "src/app/shared/_modals/modal-redirect/modal-redirect.component";

export const getGoods = createAction('[Requests] Get Goods');
export const setGoods = createAction('[Requests] Set Goods', props<{ goods: Good[]}>());
export const getCategories = createAction('[Requests] Get Categories');
export const setCategories = createAction('[Requests] Set Categories', props<{ categories: Category[]}>());

export const createRequest = createAction('[Requests] Create Request', props<{ createRequest: CreateRequest }>());
export const createRequestSuccess = createAction('[Requests] Create Request Success', props<{ data: ModalRedirectData }>());
export const failure = createAction('[Requests] Failure', props<{ error: string }>());


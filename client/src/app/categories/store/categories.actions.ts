import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/_models/category.model';
import { ProcurementItem } from 'src/app/_models/procurement-item.model';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';

export const getCategories = createAction('[Categories] Get Categories');
export const setCategories = createAction(
  '[Categories] Set Categories',
  props<{ categories: Category[] }>()
);
export const failure = createAction(
  '[Categories] Failure',
  props<{ error: string }>()
);
export const clearState = createAction('[Categories] Clear State');
export const createCategory = createAction(
  '[Categories] Create Category',
  props<{ title: string; categoryType: string }>()
);
export const createCategorySuccess = createAction(
  '[Categories] Create Category Success',
  props<{ data: ModalRedirectData }>()
);
export const getProcurementItems = createAction(
  '[Categories] Get Procurement Items',
  props<{ categoryTitle?: string }>()
);
export const setProcurementItems = createAction(
  '[Categories] Set Procurement Items',
  props<{ procurementItems: ProcurementItem[] }>()
);

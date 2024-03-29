import { createAction, props } from '@ngrx/store';
import { RequestModel } from 'src/app/_models/request.model';

export const closeDialogs = createAction('[Dialog] Close Dialogs');
export const openCreateCompanyDialog = createAction(
  '[Dialog] Open Create Company Dialog'
);
export const openCreateSubdivisionDialog = createAction(
  '[Dialog] Open Create Subdivision Dialog',
  props<{ companyId: number }>()
);
export const openCreateRequestDialog = createAction(
  '[Dialog] Open Create Request Dialog'
);
export const openEditRequestDialog = createAction(
  '[Dialog] Open Edit Request Dialog',
  props<{ request: RequestModel }>()
);
export const openCreateOrderDialog = createAction(
  '[Dialog] Open Create Order Dialog'
);
export const openSubmitProposalDialog = createAction(
  '[Dialog] Open Submit Proposal Dialog',
  props<{ orderCategoryType: string; proposalId?: number }>()
);
export const noAction = createAction('[Dialog] No Action');
export const openCreateCategoryDialog = createAction(
  '[Dialog] Open Create Category Dialog'
);

import { createAction, props } from "@ngrx/store";
import { ModalRedirectData } from "src/app/shared/_modals/modal-redirect/modal-redirect.component";

export const closeDialogs = createAction('[Dialog] Close Dialogs');
export const openCreateCompanyDialog = createAction('[Dialog] Open Create Company Dialog');
export const openCreateSubdivisionDialog = createAction('[Dialog] Open Create Subdivision Dialog', props<{ companyId: number }>());
export const openCreateRequestDialog = createAction('[Dialog] Open Create Request Dialog');
// export const openRedirectDialog = createAction('[Dialog] Open Redirect Dialog', props<{ data: ModalRedirectData }>());

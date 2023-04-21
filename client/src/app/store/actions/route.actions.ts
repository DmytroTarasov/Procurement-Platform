import { createAction, props } from "@ngrx/store";

export const redirectToOrderDetails = createAction('[Route] Redirect To Order Details', props<{ orderId: number }>());

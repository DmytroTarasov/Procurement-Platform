import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs';
import * as DialogActions from '../actions/dialog.actions';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyModalComponent } from 'src/app/auth/create-company-modal/create-company-modal.component';
import { CreateSubdivisionModalComponent } from 'src/app/auth/create-subdivision-modal/create-subdivision-modal.component';

import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as RequestsActions from 'src/app/requests/store/requests.actions';
import {
  ModalRedirectData,
  ModalRedirectComponent
} from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import { CreateRequestModalComponent } from 'src/app/requests/create-request-modal/create-request-modal.component';
import { EditRequestModalComponent } from 'src/app/requests/edit-request-modal/edit-request-modal.component';
import { CreateOrderModalComponent } from 'src/app/requests/create-order-modal/create-order-modal.component';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectRequestParams } from 'src/app/requests/store/requests.selectors';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import {
  SubmitProposalData,
  SubmitProposalModalComponent
} from 'src/app/orders/submit-proposal-modal/submit-proposal-modal.component';
import { Roles } from 'src/app/core/resources/roles';
import { CreateCategoryModalComponent } from 'src/app/categories/create-category-modal/create-category-modal.component';
import * as CategoriesActions from 'src/app/categories/store/categories.actions';

@Injectable()
export class DialogEffects {
  closeDialogs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.closeDialogs),
        withLatestFrom(this.store.pipe(select(selectRequestParams))),
        map(([action, requestParams]) => {
          this.dialog.closeAll();
          if (requestParams.categoryTitle) {
            return CategoriesActions.getProcurementItems({
              categoryTitle: requestParams.categoryTitle
            });
          }
          return DialogActions.noAction();
        })
      )
  );

  openCreateCompanyDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateCompanyDialog),
        map((action) => {
          this.dialog.open(CreateCompanyModalComponent, {
            disableClose: true
          });
        })
      ),
    { dispatch: false }
  );

  openCreateRequestDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateRequestDialog),
        map((action) => {
          this.dialog.open(CreateRequestModalComponent, {
            disableClose: true
          });
          this.ref.tick();
        })
      ),
    { dispatch: false }
  );

  openEditRequestDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openEditRequestDialog),
        map((action) => {
          this.dialog.open(EditRequestModalComponent, {
            disableClose: true,
            data: action.request
          });
        })
      ),
    { dispatch: false }
  );

  openCreateSubdivisionDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateSubdivisionDialog),
        map((action) => {
          this.dialog.open(CreateSubdivisionModalComponent, {
            disableClose: true,
            data: {
              companyId: action.companyId
            }
          });
        })
      ),
    { dispatch: false }
  );

  openRedirectDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          AuthActions.createCompanySuccess,
          AuthActions.createSubdivisionSuccess,
          RequestsActions.createRequestSuccess,
          RequestsActions.editRequestSuccess,
          OrdersActions.createOrderSuccess,
          OrdersActions.submitProposalSuccess,
          OrdersActions.chooseProposalSuccess,
          CategoriesActions.createCategorySuccess
        ),
        map((action) => {
          this.dialog.closeAll();
          this.dialog.open(ModalRedirectComponent, {
            disableClose: true,
            data: action.data
          });
        })
      );
    },
    { dispatch: false }
  );

  openRegistrationSuccessDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        withLatestFrom(this.store.pipe(select(selectUser))),
        map(([action, user]) => {
          const data: ModalRedirectData = {
            title: 'Успішно!',
            text: 'Вітаємо! Ви успішно зареєструвались.',
            primaryBtn: {
              text: 'На головну',
              route:
                user.role === Roles.Applicant || user.role === Roles.Customer
                  ? 'requests'
                  : 'orders'
            },
            successfull: true
          };
          this.dialog.open(ModalRedirectComponent, {
            disableClose: true,
            data
          });
        })
      );
    },
    { dispatch: false }
  );

  openCreateOrderDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateOrderDialog),
        map((action) => {
          this.dialog.open(CreateOrderModalComponent, {
            disableClose: true
          });
          this.ref.tick();
        })
      ),
    { dispatch: false }
  );

  openSubmitProposalDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openSubmitProposalDialog),
        withLatestFrom(this.store.select(selectUser)),
        map(([action, user]) => {
          const data: SubmitProposalData = {
            userRole: user.role,
            orderCategoryType: action.orderCategoryType,
            proposalId: action.proposalId
          };
          this.dialog.open(SubmitProposalModalComponent, {
            disableClose: true,
            data
          });
          this.ref.tick();
        })
      ),
    { dispatch: false }
  );

  openCreateCategoryDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateCategoryDialog),
        map((action) => {
          this.dialog.open(CreateCategoryModalComponent, {
            disableClose: true
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private ref: ApplicationRef
  ) {}
}

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
  ModalRedirectComponent,
} from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import { CreateRequestModalComponent } from 'src/app/requests/create-request-modal/create-request-modal.component';
import { EditRequestModalComponent } from 'src/app/requests/edit-request-modal/edit-request-modal.component';
import { CreateOrderModalComponent } from 'src/app/requests/create-order-modal/create-order-modal.component';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectRequestParams } from 'src/app/requests/store/requests.selectors';
import { selectUser } from 'src/app/auth/store/auth.selectors';

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
            return RequestsActions.getProcurementItems({ categoryTitle: requestParams.categoryTitle });
          }
          return DialogActions.noAction();
        })
      ),
    // { dispatch: false }
  );

  openCreateCompanyDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateCompanyDialog),
        map((action) => {
          const dialogRef = this.dialog.open(CreateCompanyModalComponent, {
            disableClose: true,
          });
          return dialogRef.afterClosed();
        })
      ),
    { dispatch: false }
  );

  openCreateRequestDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DialogActions.openCreateRequestDialog),
        map((action) => {
          const dialogRef = this.dialog.open(CreateRequestModalComponent, {
            disableClose: true,
          });
          this.ref.tick();
          return dialogRef.afterClosed();
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
          const dialogRef = this.dialog.open(CreateSubdivisionModalComponent, {
            disableClose: true,
            data: {
              companyId: action.companyId
            },
          });
          return dialogRef.afterClosed();
        })
      ),
    { dispatch: false }
  );

  openRedirectDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.createCompanySuccess, AuthActions.createSubdivisionSuccess,
          RequestsActions.createRequestSuccess, RequestsActions.editRequestSuccess,
          OrdersActions.createOrderSuccess),
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
          this.dialog.closeAll();
          const data: ModalRedirectData = {
            title: 'Успішно!',
            text: 'Вітаємо! Ви успішно зареєструвались.',
            primaryBtn: {
              text: 'На головну',
              route: ['Заявник', 'Замовник'].includes(user.role) ? 'requests' : 'orders'
            },
            successfull: true,
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
        })
      ),
    { dispatch: false }
  );

  // openCreateCompanySuccessDialog$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.createCompanySuccess),
  //       map(() => {
  //         this.dialog.closeAll();
  //         const data: ModalRedirectData = {
  //           title: 'Success!',
  //           text: 'Компанія успішно створена. Адміністратор верифікує її протягом 24 годин.',
  //           primaryBtn: {
  //             text: 'Ок',
  //             route: 'auth/register',
  //           },
  //           successfull: true,
  //         };
  //         this.dialog.open(ModalRedirectComponent, {
  //           disableClose: true,
  //           data,
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // openCreateSubdivisionSuccessDialog$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.createSubdivisionSuccess),
  //       map(() => {
  //         this.dialog.closeAll();
  //         const data: ModalRedirectData = {
  //           title: 'Success!',
  //           text: 'Підрозділ компанії успішно створений.',
  //           primaryBtn: {
  //             text: 'Ок',
  //             route: 'auth/register',
  //           },
  //           successfull: true,
  //         };
  //         this.dialog.open(ModalRedirectComponent, {
  //           disableClose: true,
  //           data,
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private ref: ApplicationRef
  ) {}
}

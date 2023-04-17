import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as OrdersActions from './orders.actions';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import { OrderService } from 'src/app/_services/order.service';
import { selectOrderRequests } from 'src/app/requests/store/requests.selectors';

@Injectable()
export class OrdersEffects {
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      withLatestFrom(this.store.pipe(select(selectOrderRequests))),
      switchMap(([action, requestIds]) => {
        return this.orderService.createOrder(action.title, requestIds).pipe(
          map((_) => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Замовлення було успішно сформоване.',
              primaryBtn: {
                text: 'До замовлень',
                route: 'orders',
              },
              secondaryBtn: {
                text: 'Залишитись',
                route: 'requests',
              },
              successfull: true
            };
            // need to be fixed
            return OrdersActions.createOrderSuccess({
              data
            });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as OrdersActions from './orders.actions';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import { OrderService } from 'src/app/_services/order.service';
import { selectOrderRequests } from 'src/app/requests/store/requests.selectors';
import { selectPagination } from './orders.selectors';

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
              successfull: true,
            };
            return OrdersActions.createOrderSuccess({
              data,
            });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrdersActions.getOrders,
      ),
      withLatestFrom(
        this.store.pipe(select(selectPagination)),
      ),
      switchMap(([action, pagination]) => {
        const pageNumber = action.pageNumber ?? (pagination && pagination.currentPage ? pagination.currentPage : 1);
        return this.orderService.getOrders(pageNumber).pipe(
          map((response) => {
            const pagination = JSON.parse(response.headers.get('Pagination'));
            return OrdersActions.setOrders({
              orders: response.body,
              pagination,
            });
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

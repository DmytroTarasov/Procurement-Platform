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
import { selectOrder, selectOrderParams, selectPagination } from './orders.selectors';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { AddressService } from 'src/app/_services/address.service';
import { ProposalService } from 'src/app/_services/proposal.service';

@Injectable()
export class OrdersEffects {
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      withLatestFrom(this.store.pipe(select(selectOrderRequests))),
      switchMap(([action, requestIds]) => {
        return this.orderService.createOrder({ ...action.order, requestIds }).pipe(
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
        OrdersActions.cancelOrderSuccess
      ),
      withLatestFrom(
        this.store.pipe(select(selectPagination)),
        this.store.pipe(select(selectOrderParams))
      ),
      switchMap(([action, pagination, orderParams]) => {
        const pageNumber = action.pageNumber ?? (pagination && pagination.currentPage ? pagination.currentPage : 1);
        const params = action.orderParams ?? orderParams;
        return this.orderService.getOrders(pageNumber, params).pipe(
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

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.cancelOrder),
      switchMap((action) => {
        return this.orderService.cancelOrder(action.id).pipe(
          map((id) => {
            return OrdersActions.cancelOrderSuccess({ id });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  setOrderParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.setOrderParams),
      map((action) => {
        return OrdersActions.getOrders({
          pageNumber: 1,
          orderParams: action.orderParams,
        });
      })
    )
  );

  clearState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map((action) => {
        return OrdersActions.clearState();
      })
    )
  );

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrdersActions.getOrderDetails,
        OrdersActions.submitProposalSuccess,
        OrdersActions.cancelProposalSuccess
      ),
      switchMap((action) => {
        return this.orderService.getOrderDetails(action.orderId).pipe(
          map((order) => {
            return OrdersActions.setSelectedOrder({ order });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  getCompanyOrderAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getCompanyOrderAddresses),
      switchMap((action) => {
        return this.addressService.getCompanyOrderAddresses().pipe(
          map((addresses) => {
            console.log(addresses);
            return OrdersActions.setCompanyOrderAddresses({ addresses });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  submitProposal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.submitProposal),
      withLatestFrom(this.store.pipe(select(selectOrder))),
      switchMap(([action, order]) => {
        return this.proposalService.submitProposal({ ...action.proposal, orderId: order.id }).pipe(
          map((id) => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Ваша пропозиція успішно подана.',
              primaryBtn: {
                text: 'Ок',
                route: `orders/${order.id}`,
              },
              successfull: true
            };
            return OrdersActions.submitProposalSuccess({ orderId: order.id, data });
          }),
          catchError((errorRes) => {
            return of(OrdersActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  cancelProposal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.cancelProposal),
      withLatestFrom(this.store.pipe(select(selectOrder))),
      switchMap(([action, order]) => {
        return this.proposalService.cancelProposal(action.id).pipe(
          map(_ => {
            return OrdersActions.cancelProposalSuccess({ orderId: order.id });
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
    private addressService: AddressService,
    private proposalService: ProposalService,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}
}

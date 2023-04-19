import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as RequestsActions from './requests.actions';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import { GoodService } from 'src/app/_services/good.service';
import { CategoryService } from 'src/app/_services/category.service';
import { RequestService } from 'src/app/_services/request.service';
import { selectPagination, selectRequestParams } from './requests.selectors';
import * as OrdersActions from 'src/app/orders/store/orders.actions';

@Injectable()
export class RequestsEffects {
  getGoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.getGoods),
      switchMap((action) => {
        return this.goodService.getGoods(action.categoryTitle).pipe(
          map((goods) => {
            return RequestsActions.setGoods({ goods });
          })
        );
      })
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.getCategories),
      switchMap((action) => {
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            return RequestsActions.setCategories({ categories });
          })
        );
      })
    )
  );

  getCompanyRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RequestsActions.getCompanyRequests,
        RequestsActions.createRequestSuccess,
        RequestsActions.editRequestSuccess,
        RequestsActions.cancelRequestSuccess,
        OrdersActions.createOrderSuccess
      ),
      withLatestFrom(
        this.store.pipe(select(selectPagination)),
        this.store.pipe(select(selectRequestParams))
      ),
      switchMap(([action, pagination, requestParams]) => {
        const pageNumber =
          action.pageNumber ??
          (pagination && pagination.currentPage ? pagination.currentPage : 1);
        const params = action.requestParams ?? requestParams;
        return this.requestService.getCompanyRequests(pageNumber, params).pipe(
          map((response) => {
            const pagination = JSON.parse(response.headers.get('Pagination'));
            return RequestsActions.setCompanyRequests({
              requests: response.body,
              pagination,
            });
          })
        );
      })
    )
  );

  refreshGoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.createRequestSuccess),
      withLatestFrom(this.store.pipe(select(selectRequestParams))),
      switchMap(([action, requestParams]) => {
        return this.goodService.getGoods(requestParams.categoryTitle).pipe(
          map((goods) => {
            return RequestsActions.setGoods({ goods });
          })
        );
      })
    )
  );

  // setRequestParams$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       RequestsActions.getCompanyRequests
  //     ),
  //     map((action) => {
  //       if (action.requestParams) return RequestsActions.setRequestParams({ requestParams: action.requestParams });
  //       return RequestsActions.noAction();
  //     })
  //   )
  // );
  setRequestParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.setRequestParams),
      map((action) => {
        return RequestsActions.getCompanyRequests({
          pageNumber: 1,
          requestParams: action.requestParams,
        });
      })
    )
  );

  createRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.createRequest),
      switchMap((action) => {
        return this.requestService.createRequest(action.createRequest).pipe(
          map((_) => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Ваша заявка успішно створена.',
              primaryBtn: {
                text: 'Ок',
                route: 'requests',
              },
              successfull: true,
            };
            return RequestsActions.createRequestSuccess({
              data,
              pageNumber: 1,
            });
          }),
          catchError((errorRes) => {
            return of(RequestsActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  clearState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map((action) => {
        return RequestsActions.clearState();
      })
    )
  );

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.editRequest),
      switchMap((action) => {
        return this.requestService.editRequest(action.data).pipe(
          map((_) => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Заявка була успішно відредагована.',
              primaryBtn: {
                text: 'Ок',
                route: 'requests',
              },
              successfull: true,
            };
            return RequestsActions.editRequestSuccess({ data });
          }),
          catchError((errorRes) => {
            return of(RequestsActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  cancelRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.cancelRequest),
      switchMap((action) => {
        return this.requestService.cancelRequest(action.id).pipe(
          map((id) => {
            return RequestsActions.cancelRequestSuccess({ id });
          }),
          catchError((errorRes) => {
            return of(RequestsActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private goodService: GoodService,
    private categoryService: CategoryService,
    private requestService: RequestService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}
}

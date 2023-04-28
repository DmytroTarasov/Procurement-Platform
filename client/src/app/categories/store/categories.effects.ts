import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as CategoriesActions from './categories.actions';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ProcurementItemService } from 'src/app/_services/procurement-item.service';
import { CategoryService } from 'src/app/_services/category.service';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';
import * as RequestsActions from 'src/app/requests/store/requests.actions';
import { selectRequestParams } from 'src/app/requests/store/requests.selectors';

@Injectable()
export class CategoriesEffects {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CategoriesActions.getCategories,
        CategoriesActions.createCategorySuccess
      ),
      switchMap((action) => {
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            return CategoriesActions.setCategories({ categories });
          })
        );
      })
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      switchMap((action) => {
        return this.categoryService.createCategory(action.title, action.categoryType).pipe(
          map(id => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Категорія успішно створена.',
              primaryBtn: {
                text: 'Ок',
                route: 'categories',
              },
              successfull: true
            };
            return CategoriesActions.createCategorySuccess({ data });
          }),
          catchError((errorRes) => {
            return of(CategoriesActions.failure({ error: errorRes?.error }));
          })
        )
      })
    )
  );

  getProcurementItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getProcurementItems),
      switchMap((action) => {
        return this.procurementItemService.getProcurementItems(action.categoryTitle).pipe(
          map((procurementItems) => {
            return CategoriesActions.setProcurementItems({ procurementItems });
          })
        );
      })
    )
  );

  refreshProcurementItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.createRequestSuccess),
      withLatestFrom(this.store.pipe(select(selectRequestParams))),
      switchMap(([action, requestParams]) => {
        return this.procurementItemService.getProcurementItems(requestParams.categoryTitle).pipe(
          map((procurementItems) => {
            return CategoriesActions.setProcurementItems({ procurementItems });
          })
        );
      })
    )
  );

  clearState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map((action) => {
        return CategoriesActions.clearState();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private procurementItemService: ProcurementItemService,
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}

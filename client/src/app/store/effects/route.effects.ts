import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as fromApp from '../../store/app.reducer';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as RouteActions from '../actions/route.actions';

@Injectable()
export class RouteEffects {
  redirectToMain$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        withLatestFrom(this.store.pipe(select(selectUser))),
        tap(([action, user]) => {
          if (action.redirect) {
            this.router.navigateByUrl(['Заявник', 'Замовник'].includes(user.role) ? 'requests' : 'orders');
          }
        })
      ),
    { dispatch: false }
  );

  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(_ => {
          this.router.navigateByUrl('auth/login');
        })
      ),
    { dispatch: false }
  );

  redirectToOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouteActions.redirectToOrderDetails),
        tap(action => {
          this.router.navigateByUrl(`orders/${action.orderId}`);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}

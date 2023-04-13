import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RouteEffects {
  redirectToMain$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(_ => {
          this.router.navigateByUrl('/');
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

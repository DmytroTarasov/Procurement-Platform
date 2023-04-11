import { Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/_services/role.service';
import { CompanyService } from 'src/app/_services/company.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRedirectComponent, ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';

@Injectable()
export class AuthEffects {
  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getRoles),
      switchMap((action) => {
        return this.roleService.getAllRoles().pipe(
          map((roles) => {
            return AuthActions.setRoles({ roles });
          })
        );
      })
    )
  );

  getCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getCompanies),
      switchMap((action) => {
        return this.companyService.getAllCompanies().pipe(
          map((companies) => {
            return AuthActions.setCompanies({ companies });
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        return this.authService.register(action.user).pipe(
          map((user) => {
            console.log(user);
            localStorage.setItem('token', user.token);
            return AuthActions.registerSuccess({ user });
          }),
          catchError(errorRes => {
            return of(AuthActions.registerFailure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  openRegistrationSuccessDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.registerSuccess, AuthActions.openModal),
        map(() => {
          this.dialog.closeAll();
          const data: ModalRedirectData = {
            title: 'Success!',
            text: 'Вітаємо! Ви успішно зареєструвались.',
            primaryBtn: {
              text: 'На головну',
              route: '/',
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

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}
}

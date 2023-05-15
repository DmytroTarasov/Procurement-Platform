import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { RoleService } from 'src/app/_services/role.service';
import { CompanyService } from 'src/app/_services/company.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ModalRedirectData } from 'src/app/shared/_modals/modal-redirect/modal-redirect.component';

@Injectable()
export class AuthEffects {
  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getRoles),
      switchMap(() => {
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
      ofType(
        AuthActions.getCompanies,
        AuthActions.createCompanySuccess,
        AuthActions.createSubdivisionSuccess
      ),
      switchMap(() => {
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
            localStorage.setItem('token', user.token);
            return AuthActions.registerSuccess({ user });
          }),
          catchError((errorRes) => {
            return of(AuthActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  createCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createCompany),
      switchMap((action) => {
        return this.companyService.createCompany(action.company).pipe(
          map(() => {
            const data: ModalRedirectData = {
              title: 'Успішно!',
              text: 'Компанія успішно створена.',
              primaryBtn: {
                text: 'Ок',
                route: 'auth/register'
              },
              successfull: true
            };
            return AuthActions.createCompanySuccess({ data });
          }),
          catchError((errorRes) => {
            return of(AuthActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  createSubdivision$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createSubdivision),
      switchMap((action) => {
        return this.companyService
          .createCompanySubdivision(action.companyId, action.subdivision)
          .pipe(
            map(() => {
              const data: ModalRedirectData = {
                title: 'Успішно!',
                text: 'Підрозділ компанії успішно створений.',
                primaryBtn: {
                  text: 'Ок',
                  route: 'auth/register'
                },
                successfull: true
              };
              return AuthActions.createSubdivisionSuccess({ data });
            }),
            catchError((errorRes) => {
              return of(AuthActions.failure({ error: errorRes?.error }));
            })
          );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.login(action.login).pipe(
          map((user) => {
            localStorage.setItem('token', user.token);
            return AuthActions.loginSuccess({ user, redirect: true });
          }),
          catchError((errorRes) => {
            return of(AuthActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((user) => {
            return AuthActions.loginSuccess({ user, redirect: false });
          }),
          catchError((errorRes) => {
            return of(AuthActions.failure({ error: errorRes?.error }));
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private companyService: CompanyService,
    private authService: AuthService
  ) {}
}

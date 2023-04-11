import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/_services/role.service';
import { CompanyService } from 'src/app/_services/company.service';

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

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private companyService: CompanyService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}

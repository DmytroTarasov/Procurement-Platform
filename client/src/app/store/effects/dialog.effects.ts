import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as DialogActions from '../actions/dialog.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogEffects {
  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DialogActions.closeDialogs),
      tap((action) => {
        this.dialog.closeAll();
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}
}

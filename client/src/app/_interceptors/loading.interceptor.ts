import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize, identity } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as SpinnerActions from '../store/actions/spinner.actions';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(SpinnerActions.showSpinner());
    return next.handle(request).pipe(
      (environment.production ? identity : delay(700)),
      finalize(() => {
        this.store.dispatch(SpinnerActions.hideSpinner());
      })
    );
  }
}

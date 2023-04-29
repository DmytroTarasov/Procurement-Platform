import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(selectUser),
      take(1),
      exhaustMap(user => {
        const token = localStorage.getItem('token');
        if ((user && user.token) || token) {
          const modifiedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(modifiedRequest);
        }
        return next.handle(req);
      })
    )
  }
}

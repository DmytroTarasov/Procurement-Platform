import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsLoggedIn();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsLoggedIn();
  }

  checkIsLoggedIn() {
    return this.store.pipe(
      select(selectUser),
      take(1),
      map(user => {
        const token = localStorage.getItem('token');
        const isAuth = (user && user.token) || token;

        if (isAuth) return true;

        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, catchError, filter, of, switchMap, take, tap } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { selectOrder } from '../orders/store/orders.selectors';
import * as OrdersActions from 'src/app/orders/store/orders.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const orderId = +route.paramMap.get('orderId');
    return this.store.pipe(
      select(selectOrder),
      tap((order) => {
        if (!order || order.id !== orderId) {
          this.store.dispatch(OrdersActions.getOrderDetails({ id: orderId }));
        }
      }),
      filter((order) => !!order && order.id === orderId),
      take(1),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../store/orders.actions';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/_models/user.model';
import { OrderStatuses } from 'src/app/core/resources/statuses';
import { OrderParams } from 'src/app/_models/order-params.model';
import { selectOrderParams } from '../store/orders.selectors';
import { Roles } from 'src/app/core/resources/roles';

@Component({
  selector: 'app-orders-actions',
  templateUrl: './orders-actions.component.html',
  styleUrls: ['./orders-actions.component.scss']
})
export class OrdersActionsComponent implements OnInit, OnDestroy {
  orderStatuses = [{ key: '', value: 'Всі' }, ...Object.keys(OrderStatuses).map(key => {
    const splitted = OrderStatuses[key].split(' ');
    splitted[0] = splitted[0].replace(/е$/, 'і');
    return { key, value: splitted.join(' ') }
  })];

  actionsForm: FormGroup;
  orderParams: OrderParams;
  paramsSubscription: Subscription;
  user$: Observable<User>;
  Roles = Roles;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.actionsForm = new FormGroup({
      status: new FormControl('')
    });

    this.user$ = this.store.pipe(select(selectUser));

    this.paramsSubscription = this.store.pipe(select(selectOrderParams)).subscribe(orderParams => {
      this.orderParams = orderParams;
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.actionsForm.get(controlName) as FormControl;
  }

  setOrderParamsStatus(status: string) {
    this.store.dispatch(OrdersActions.setOrderParams({ orderParams: { ...this.orderParams, status }}));
  }

  ngOnDestroy() {
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
  }

  onChange(checked: boolean) {
    this.store.dispatch(OrdersActions.setOrderParams({ orderParams: { ...this.orderParams, companyOrders: checked }}));
  }
}

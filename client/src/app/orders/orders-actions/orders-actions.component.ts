import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../store/orders.actions';
import { Observable, Subscription, map } from 'rxjs';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/_models/user.model';
import { orderStatuses } from 'src/app/_models/resources/order-statuses';
import { OrderParams } from 'src/app/_models/order-params.model';
import { selectOrderParams } from '../store/orders.selectors';

@Component({
  selector: 'app-orders-actions',
  templateUrl: './orders-actions.component.html',
  styleUrls: ['./orders-actions.component.scss']
})
export class OrdersActionsComponent implements OnInit, OnDestroy {
  orderStatuses = [{ key: '', value: 'Всі' }, ...Object.entries(orderStatuses).map(([key, value]) => {
    var splitted = value.split(' ');
    splitted[0] = splitted[0].replace(/е$/, 'і');
    value = splitted.join(' ');
    return { key, value }
  })];

  actionsForm: FormGroup;
  orderParams: OrderParams;
  paramsSubscription: Subscription;
  user$: Observable<User>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.actionsForm = new FormGroup({
      status: new FormControl(''),
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
}

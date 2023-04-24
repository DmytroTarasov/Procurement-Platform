import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as fromApp from 'src/app/store/app.reducer';
import { OrderStatuses, StatusesColors } from 'src/app/core/resources/statuses';
import * as OrdersActions from '../store/orders.actions';
import * as RouteActions from 'src/app/store/actions/route.actions';
import { Roles } from 'src/app/core/resources/roles';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrls: ['./orders-list-item.component.scss']
})
export class OrdersListItemComponent implements OnInit {
  @Input() order: Order;
  OrderStatuses = OrderStatuses;
  StatusesColors = StatusesColors;
  user$: Observable<User>;
  Roles = Roles;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
  }

  cancelOrder() {
    this.store.dispatch(OrdersActions.cancelOrder({ id: this.order.id }));
  }

  openOrderDetails() {
    this.store.dispatch(RouteActions.redirectToOrderDetails({ orderId: this.order.id }));
  }
}

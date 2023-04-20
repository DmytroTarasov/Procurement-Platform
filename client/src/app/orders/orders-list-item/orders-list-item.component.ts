import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as fromApp from 'src/app/store/app.reducer';
import { orderStatuses, orderStatusesColors } from 'src/app/_models/resources/order-statuses';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrls: ['./orders-list-item.component.scss']
})
export class OrdersListItemComponent implements OnInit {
  @Input() order: Order;
  orderStatuses = orderStatuses;
  orderStatusesColors = orderStatusesColors;
  user$: Observable<User>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
  }

  cancelOrder() {
    
  }
}

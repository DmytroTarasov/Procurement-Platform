import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { selectOrder } from '../store/orders.selectors';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { orderStatuses } from 'src/app/_models/resources/order-statuses';
import { measurementUnits, getShortenMeasurementUnit } from 'src/app/_models/resources/measurement-units';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<Order>;
  orderStatuses = orderStatuses;
  getShortenMeasurementUnit = getShortenMeasurementUnit;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.store.dispatch(OrdersActions.getOrderDetails({ id: orderId }));

    this.order$ = this.store.pipe(select(selectOrder));
  }

}

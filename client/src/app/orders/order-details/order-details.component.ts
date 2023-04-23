import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { selectOrder } from '../store/orders.selectors';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { orderStatuses } from 'src/app/_models/resources/order-statuses';
import { getShortenMeasurementUnit } from 'src/app/_models/resources/measurement-units';
import { Address } from 'src/app/_models/address.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as DialogActions from 'src/app/store/actions/dialog.actions';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<Order>;
  loading$: Observable<boolean>;
  orderStatuses = orderStatuses;
  getShortenMeasurementUnit = getShortenMeasurementUnit;
  user$: Observable<User>;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.store.dispatch(OrdersActions.getOrderDetails({ id: orderId }));

    this.order$ = this.store.pipe(select(selectOrder));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.user$ = this.store.pipe(select(selectUser));
  }

  tranformCompanyAddress(address: Address) {
    const data = [address.city, address.street, address.zipCode];
    if (address.region) {
      data.splice(1, 0, `${address.region} область`);
    }
    if (address.buildingNumber) {
      data.splice(-1, 0, address.buildingNumber);
    }
    return data.join(', ');
  }

  openSubmitProposalDialog() {
    this.store.dispatch(DialogActions.openSubmitProposalDialog());
  }
}

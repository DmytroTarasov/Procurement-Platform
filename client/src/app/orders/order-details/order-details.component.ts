import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { selectOrder } from '../store/orders.selectors';
import { Observable, Subscription } from 'rxjs';
import { ContactPerson, Order } from 'src/app/_models/order.model';
import { orderStatuses } from 'src/app/core/resources/statuses';
import { getShortenMeasurementUnit } from 'src/app/core/resources/measurement-units';
import { Address } from 'src/app/_models/address.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import { proposalStatuses, statusesColors } from 'src/app/core/resources/statuses';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  loading$: Observable<boolean>;
  orderStatuses = orderStatuses;
  proposalStatuses = proposalStatuses;
  statusesColors = statusesColors;
  getShortenMeasurementUnit = getShortenMeasurementUnit;
  user$: Observable<User>;
  user: User;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.store.dispatch(OrdersActions.getOrderDetails({ orderId }));

    this.order$ = this.store.pipe(select(selectOrder));
    this.loading$ = this.store.pipe(select(selectLoading));
    // this.user$ = this.store.pipe(select(selectUser));
    this.userSubscription = this.store.pipe(select(selectUser)).subscribe(user => {
      this.user = user;
    });
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

  getFullName(person: ContactPerson) {
    return `${person.lastName} ${person.firstName} ${person.middleName}`;
  }

  openSubmitProposalDialog(proposalId?: number) {
    // const submitTransportProposalAsSupplier =
    this.store.dispatch(DialogActions.openSubmitProposalDialog({ proposalId }));
  }

  anySupplierProposals(order: Order) {
    return order.proposals.some(p => p.supplierContactPerson.companyId === this.user.companyId);
  }

  anyTransporterProposals(order: Order, supplierCompanyId: number) {
    return order.proposals.some(p =>
      p.supplierContactPerson.companyId === supplierCompanyId &&
      p.transporterContactPerson?.companyId === this.user.companyId);
  }

  cancelProposal(id: number) {
    this.store.dispatch(OrdersActions.cancelProposal({ id }));
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { selectOrder } from '../store/orders.selectors';
import { Observable, Subscription } from 'rxjs';
import { ContactPerson, Order } from 'src/app/_models/order.model';
import { OrderStatuses } from 'src/app/core/resources/statuses';
import { getShortenMeasurementUnit } from 'src/app/core/resources/measurement-units';
import { Address } from 'src/app/_models/address.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import { ProposalStatuses, StatusesColors } from 'src/app/core/resources/statuses';
import { Roles } from 'src/app/core/resources/roles';
import { Proposal } from 'src/app/_models/proposal.model';
import { CategoryTypes } from 'src/app/core/resources/category-types';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  loading$: Observable<boolean>;
  OrderStatuses = OrderStatuses;
  ProposalStatuses = ProposalStatuses;
  StatusesColors = StatusesColors;
  getShortenMeasurementUnit = getShortenMeasurementUnit;
  user: User;
  userSubscription: Subscription;
  Roles = Roles;
  CategoryTypes = CategoryTypes;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.store.dispatch(OrdersActions.getOrderDetails({ orderId }));

    this.order$ = this.store.pipe(select(selectOrder));
    this.loading$ = this.store.pipe(select(selectLoading));
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

  openSubmitProposalDialog(orderCategoryType: string, proposalId?: number) {
    this.store.dispatch(DialogActions.openSubmitProposalDialog({ orderCategoryType, proposalId }));
  }

  anySupplierProposals(order: Order) {
    return order.proposals.some(p => p.supplierContactPerson.companyId === this.user.companyId
      && ProposalStatuses[p.status] === ProposalStatuses.Active);
  }

  anyTransporterProposals(order: Order, supplierCompanyId: number) {
    return order.proposals.some(p =>
      p.supplierContactPerson.companyId === supplierCompanyId &&
      p.transporterContactPerson?.companyId === this.user.companyId &&
      ProposalStatuses[p.status] === ProposalStatuses.Active);
  }

  cancelProposal(id: number, cancelTransportProposal?: boolean) {
    this.store.dispatch(OrdersActions.cancelProposal({ id, cancelTransportProposal }));
  }

  getProposalTotalSum(proposal: Proposal) {
    return proposal.supplierPrice + proposal.transporterSum;
  }

  isCategoryTypeGoods(order: Order) {
    return CategoryTypes[order.categoryType] === CategoryTypes.Goods;
  }

  isProposalStatusActive(proposal: Proposal) {
    return ProposalStatuses[proposal.status] === ProposalStatuses.Active;
  }

  isAllowedToSubmitTransportProposal(order: Order, proposal: Proposal) {
    return (this.user?.role === Roles.Transporter || proposal.supplierContactPerson.id === this.user?.id) && this.isProposalStatusActive(proposal) && !this.anyTransporterProposals(order, proposal.supplierContactPerson.companyId) && this.isCategoryTypeGoods(order);
  }

  isAllowedToChooseProposal(order: Order, proposal: Proposal) {
    return this.user?.role === Roles.Customer && this.isProposalStatusActive(proposal) && (proposal.transporterContactPerson || (proposal.supplierContactPerson && !this.isCategoryTypeGoods(order)));
  }

  showProposalPrice(order: Order, proposal: Proposal, isSupplierProposal: boolean) {
    return ((this.user?.role === Roles.Applicant || this.user?.role === Roles.Customer)
      && order.buyerContactPerson.companyId === this.user?.companyId)
      || (this.user?.role === Roles.Supplier && proposal.supplierContactPerson.id === this.user?.id && isSupplierProposal)
      || (this.user?.role === Roles.Transporter && proposal.transporterContactPerson?.id === this.user?.id && !isSupplierProposal);
      // || ((this.user?.role === Roles.Supplier || this.user?.role === Roles.Transporter)
      // && (proposal.supplierContactPerson.id === this.user?.id || proposal.transporterContactPerson?.id === this.user?.id));
  }

  chooseProposal(id: number) {
    this.store.dispatch(OrdersActions.chooseProposal({ id }));
  }

  ngOnDestroy() {
    this.store.dispatch(OrdersActions.resetSelectedOrder());
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}

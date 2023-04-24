import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { Pagination } from 'src/app/_models/pagination.model';
import * as fromApp from 'src/app/store/app.reducer';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import * as OrdersActions from '../store/orders.actions';
import { selectOrders, selectPagination } from '../store/orders.selectors';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  pagination: Pagination;
  paginationSubscription: Subscription;
  ordersSubscription: Subscription;
  orders: Order[] | null = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ordersSubscription = this.store.pipe(select(selectOrders)).subscribe(orders => {
      if (!orders) {
        this.store.dispatch(OrdersActions.getOrders({}));
      } else {
        this.orders = orders;
      }
    });

    this.loading$ = this.store.pipe(select(selectLoading));

    this.paginationSubscription = this.store.pipe(select(selectPagination)).subscribe(pagination => {
      this.pagination = pagination;
    });
  }

  pageChanged(page: number) {
    if (this.pagination.currentPage != page) {
      this.store.dispatch(OrdersActions.getOrders({ pageNumber: page }));
    }
  }

  ngOnDestroy() {
    if (this.paginationSubscription) this.paginationSubscription.unsubscribe();
    if (this.ordersSubscription) this.ordersSubscription.unsubscribe();
  }
}

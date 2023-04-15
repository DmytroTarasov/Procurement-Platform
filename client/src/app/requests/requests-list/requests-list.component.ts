import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Store, select } from '@ngrx/store';
import { selectCompanyRequests } from '../store/requests.selectors';
import { Observable, Subscription } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { PaginationInstance } from 'ngx-pagination';
import { selectPagination } from '../store/requests.selectors';
import { Pagination } from 'src/app/_models/pagination.model';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, OnDestroy {
  requests$: Observable<RequestModel[]>;
  loading$: Observable<boolean>;
  pagination: Pagination;
  subscription: Subscription;

  // public config: PaginationInstance = {
  //     id: 'custom',
  //     itemsPerPage: this.pagination.itemsPerPage,
  //     currentPage: 1,
  //     totalItems:
  // };

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getCompanyRequests({}));

    this.requests$ = this.store.pipe(select(selectCompanyRequests));
    this.loading$ = this.store.pipe(select(selectLoading));

    this.store.pipe(select(selectPagination)).subscribe(pagination => {
      this.pagination = pagination;
    });
  }

  pageChanged(page: number) {
    if (this.pagination.currentPage != page) {
      this.store.dispatch(RequestsActions.getCompanyRequests({ pageNumber: page }));
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Store, select } from '@ngrx/store';
import { selectCompanyRequests } from '../store/requests.selectors';
import { Observable, Subscription } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import { selectPagination } from '../store/requests.selectors';
import { Pagination } from 'src/app/_models/pagination.model';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  pagination: Pagination;
  paginationSubscription: Subscription;
  requestsSubscription: Subscription;
  requests: RequestModel[] | null = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getCompanyRequests({}));

    this.requestsSubscription = this.store.pipe(select(selectCompanyRequests)).subscribe(requests => {
      this.requests = requests;
    });

    this.loading$ = this.store.pipe(select(selectLoading));

    this.paginationSubscription = this.store.pipe(select(selectPagination)).subscribe(pagination => {
      this.pagination = pagination;
    });
  }

  pageChanged(page: number) {
    if (this.pagination.currentPage != page) {
      this.store.dispatch(RequestsActions.getCompanyRequests({ pageNumber: page }));
    }
  }

  ngOnDestroy() {
    if (this.paginationSubscription) this.paginationSubscription.unsubscribe();
    if (this.requestsSubscription) this.requestsSubscription.unsubscribe();
  }
}

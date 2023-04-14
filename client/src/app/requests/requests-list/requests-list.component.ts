import { Component, OnInit } from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Store, select } from '@ngrx/store';
import { selectCompanyRequests } from '../store/requests.selectors';
import { Observable } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  requests$: Observable<RequestModel[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getCompanyRequests());

    this.requests$ = this.store.pipe(select(selectCompanyRequests));
    this.loading$ = this.store.pipe(select(selectLoading));
  }

}

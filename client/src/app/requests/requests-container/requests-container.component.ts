import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { selectOrderRequests } from '../store/requests.selectors';
import { Roles } from 'src/app/core/resources/roles';

@Component({
  selector: 'app-requests-container',
  templateUrl: './requests-container.component.html',
  styleUrls: ['./requests-container.component.scss']
})
export class RequestsContainerComponent implements OnInit {
  user$: Observable<User>;
  orderRequests$: Observable<number[]>;
  Roles = Roles;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
    this.orderRequests$ = this.store.pipe(select(selectOrderRequests));
  }

  openCreateRequestDialog() {
    this.store.dispatch(DialogActions.openCreateRequestDialog());
  }

  openCreateOrderDialog() {
    this.store.dispatch(DialogActions.openCreateOrderDialog());
  }
}

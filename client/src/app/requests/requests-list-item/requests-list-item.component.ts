import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import { measurementUnits, getShortenMeasurementUnit } from 'src/app/_models/resources/measurement-units';
import { requestStatuses, requestStatusesColors } from 'src/app/_models/resources/request-statuses';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as fromApp from 'src/app/store/app.reducer';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import * as RequestsActions from '../store/requests.actions';
import { selectOrderRequests } from '../store/requests.selectors';

@Component({
  selector: 'app-requests-list-item',
  templateUrl: './requests-list-item.component.html',
  styleUrls: ['./requests-list-item.component.scss']
})
export class RequestsListItemComponent implements OnInit {
  @Input() request: RequestModel;
  measurementUnits = measurementUnits;
  requestStatuses = requestStatuses;
  requestStatusesColors = requestStatusesColors;
  getShortenMeasurementUnit = getShortenMeasurementUnit;
  user$: Observable<User>;
  orderRequests$: Observable<number[]>;
  // orderRequests: number[];
  // orderRequestsSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
    this.orderRequests$ = this.store.pipe(select(selectOrderRequests));
    // this.orderRequestsSubscription = this.store.pipe(select(selectOrderRequests)).subscribe(orderRequests => {
    //   this.orderRequests = orderRequests;
    // });
  }

  get subdivisionAddress() {
    return `${this.request.subdivision.street}, ${this.request.subdivision.city}`;
  }

  openEditRequestDialog() {
    this.store.dispatch(DialogActions.openEditRequestDialog({ request: this.request }));
  }

  cancelRequest() {
    this.store.dispatch(RequestsActions.cancelRequest({ id: this.request.id }));
  }

  addRequestToOrder() {
    this.store.dispatch(RequestsActions.addRequestToOrder({ id: this.request.id }));
  }

  deleteRequestFromOrder() {
    this.store.dispatch(RequestsActions.deleteRequestFromOrder({ id: this.request.id }));
  }

  // ngOnDestroy() {
  //   if (this.orderRequestsSubscription) this.orderRequestsSubscription.unsubscribe();
  // }
}

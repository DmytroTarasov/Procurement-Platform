import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import { measurementUnits, getShortenMeasurementUnit } from 'src/app/_models/resources/measurement-units';
import { requestStatuses, requestStatusesColors } from 'src/app/_models/resources/request-statuses';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import * as fromApp from 'src/app/store/app.reducer';
import * as DialogActions from 'src/app/store/actions/dialog.actions';
import * as RequestsActions from '../store/requests.actions';

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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
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
}

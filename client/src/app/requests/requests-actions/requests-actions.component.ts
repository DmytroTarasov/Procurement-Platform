import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { requestStatuses } from 'src/app/_models/resources/request-statuses';
import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Observable, Subscription, map } from 'rxjs';
import { selectCategories, selectRequestParams } from '../store/requests.selectors';
import { RequestParams } from 'src/app/_models/request-params.model';
import { selectProcurementItems } from '../store/requests.selectors';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/_models/user.model';

export interface Model {
  key: string;
  value: string;
}

@Component({
  selector: 'app-requests-actions',
  templateUrl: './requests-actions.component.html',
  styleUrls: ['./requests-actions.component.scss']
})
export class RequestsActionsComponent implements OnInit, OnDestroy {
  requestStatuses = [{ key: '', value: 'Всі' }, ...Object.entries(requestStatuses).map(([key, value]) => {
    var splitted = value.split(' ');
    splitted[0] = splitted[0].replace(/а$/, 'і');
    value = splitted.join(' ');
    return { key, value }
  })];
  actionsForm: FormGroup;
  requestParams: RequestParams;
  paramsSubscription: Subscription;
  user$: Observable<User>;
  categories$: Observable<Model[]>;
  procurementItems$: Observable<Model[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getCategories());
    this.store.dispatch(RequestsActions.getProcurementItems({}));

    this.actionsForm = new FormGroup({
      status: new FormControl(''),
      categoryTitle: new FormControl(''),
      procurementItemTitle: new FormControl('')
    });

    this.user$ = this.store.pipe(select(selectUser));

    this.categories$ = this.store.pipe(
      select(selectCategories),
      map(this.transform)
    );

    this.procurementItems$ = this.store.pipe(
      select(selectProcurementItems),
      map(this.transform)
    );

    this.paramsSubscription = this.store.pipe(select(selectRequestParams)).subscribe(requestParams => {
      this.requestParams = requestParams;
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.actionsForm.get(controlName) as FormControl;
  }

  setRequestParamsStatus(status: string) {
    this.store.dispatch(RequestsActions.setRequestParams({ requestParams: { ...this.requestParams, status }}));
  }

  setRequestParamsCategory(categoryTitle: string) {
    this.store.dispatch(RequestsActions.getProcurementItems({ categoryTitle }));
    this.store.dispatch(RequestsActions.setRequestParams({ requestParams: { ...this.requestParams, categoryTitle, procurementItemTitle: '' }}));
    this.getFormControl('procurementItemTitle').setValue('');
  }

  setRequestParamsProcurementItem(procurementItemTitle: string) {
    this.store.dispatch(RequestsActions.setRequestParams({ requestParams: { ...this.requestParams, procurementItemTitle }}));
  }

  transform(arr: any[]) {
    if (arr == null) return [{ key: '', value: 'Всі' }];
    return [{ key: '', value: 'Всі' }].concat(arr.map(i => ({ key: i.title, value: i.title })));
  }

  ngOnDestroy() {
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
  }
}

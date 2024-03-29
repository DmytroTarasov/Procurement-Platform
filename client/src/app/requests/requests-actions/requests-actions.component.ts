import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { RequestStatuses } from 'src/app/core/resources/statuses';
import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Observable, Subscription, map } from 'rxjs';
import { selectRequestParams } from '../store/requests.selectors';
import { RequestParams } from 'src/app/_models/request-params.model';
import { selectCategories, selectProcurementItems } from 'src/app/categories/store/categories.selectors';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/_models/user.model';
import { Roles } from 'src/app/core/resources/roles';
import * as CategoriesActions from 'src/app/categories/store/categories.actions';

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
  requestStatuses = [{ key: '', value: 'Всі' }, ...Object.keys(RequestStatuses).map(key => {
    const splitted = RequestStatuses[key].split(' ');
    splitted[0] = splitted[0].replace(/а$/, 'і');
    return { key, value: splitted.join(' ') }
  })];
  actionsForm: FormGroup;
  requestParams: RequestParams;
  paramsSubscription: Subscription;
  user$: Observable<User>;
  categories$: Observable<Model[]>;
  procurementItems$: Observable<Model[]>;
  Roles = Roles;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(CategoriesActions.getProcurementItems({}));

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
    this.store.dispatch(CategoriesActions.getProcurementItems({ categoryTitle }));
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

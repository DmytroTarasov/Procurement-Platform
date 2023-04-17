import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { requestStatuses } from 'src/app/_models/resources/request-statuses';
import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import { Observable, Subscription } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination.model';
import { selectRequestParams } from '../store/requests.selectors';
import { RequestParams } from 'src/app/_models/request-params.model';
import { selectGoods } from '../store/requests.selectors';
import { Good } from 'src/app/_models/good.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/_models/user.model';

export interface GoodModel {
  key: string;
  value: string;
}

@Component({
  selector: 'app-requests-actions',
  templateUrl: './requests-actions.component.html',
  styleUrls: ['./requests-actions.component.scss']
})
export class RequestsActionsComponent implements OnInit, OnDestroy {
  // ({ key, value })
  requestStatuses = [{ key: '', value: 'Всі' }, ...Object.entries(requestStatuses).map(([key, value]) => {
    var splitted = value.split(' ');
    splitted[0] = splitted[0].replace(/а$/, 'і');
    value = splitted.join(' ');
    return { key, value }
  })];
  actionsForms: FormGroup;
  requestParams: RequestParams;
  paramsSubscription: Subscription;
  goodsSubscription: Subscription;
  // goods$: Observable<Good[]>;
  goods: GoodModel[] = [{ key: '', value: 'Всі' }];
  user$: Observable<User>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getGoods());

    this.actionsForms = new FormGroup({
      status: new FormControl(''),
      goodTitle: new FormControl('')
    });

    this.user$ = this.store.pipe(select(selectUser));

    this.paramsSubscription = this.store.pipe(select(selectRequestParams)).subscribe(requestParams => {
      this.requestParams = requestParams;
    });
    // this.goods$ = this.store.pipe(select(selectGoods));
    this.goodsSubscription = this.store.pipe(select(selectGoods)).subscribe(goods => {
      if (goods != null) {
        // this.goods = [{ key: '', value: 'Всі' }];
        this.goods = [{ key: '', value: 'Всі' }].concat(goods.map(g => ({ key: g.title, value: g.title })));
      }
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.actionsForms.get(controlName) as FormControl;
  }

  getCompanyRequestsByStatus(status: string) {
    // const newRequetParams: RequestParams = { ...this.requestParams, status };
    // this.store.dispatch(RequestsActions.setRequestParams({ requestParams: newRequetParams }));
    this.store.dispatch(RequestsActions.getCompanyRequests({ pageNumber: 1, requestParams: { ...this.requestParams, status } }));
  }

  getCompanyRequestsByGoodTitle(goodTitle: string) {
    this.store.dispatch(RequestsActions.getCompanyRequests({ pageNumber: 1, requestParams: { ...this.requestParams, goodTitle } }));
  }

  ngOnDestroy() {
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
    if (this.goodsSubscription) this.goodsSubscription.unsubscribe();
  }

}

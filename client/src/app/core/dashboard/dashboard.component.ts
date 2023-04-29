import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // this.store.pipe(
    //   select(selectUser),
    //   take(1),
    //   tap((user) => {
    //     console.log(user);
    //     if (!user) this.store.dispatch(AuthActions.autoLogin());
    //   })
    // );
    this.store.dispatch(AuthActions.autoLogin());
  }
}

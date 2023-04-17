import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';

import * as fromApp from 'src/app/store/app.reducer';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
    this.loading$ = this.store.pipe(select(selectLoading));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}

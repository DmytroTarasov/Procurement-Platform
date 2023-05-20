import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import { selectError } from '../store/auth.selectors';
import * as AuthActions from '../store/auth.actions';
import { getEmailValidators, getPasswordValidators } from 'src/app/core/resources/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.clearError());
    this.loginForm = new FormGroup({
      email: new FormControl('', getEmailValidators()),
      password: new FormControl('', getPasswordValidators())
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.store.dispatch(AuthActions.login({ login: this.loginForm.value }));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError } from 'src/app/auth/store/auth.selectors';

import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: ['./create-request-modal.component.scss']
})
export class CreateRequestModalComponent implements OnInit {
  requestForm: FormGroup;
  error$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.requestForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.requestForm.valid) return;

    // this.store.dispatch(AuthActions.createCompany({ company: this.companyForm.value }));
  }
}

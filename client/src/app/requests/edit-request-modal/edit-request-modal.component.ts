import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RequestModel } from 'src/app/_models/request.model';
import * as fromApp from 'src/app/store/app.reducer';
import { selectError } from '../store/requests.selectors';
import * as RequestsActions from '../store/requests.actions';

@Component({
  selector: 'app-edit-request-modal',
  templateUrl: './edit-request-modal.component.html',
  styleUrls: ['./edit-request-modal.component.scss'],
})
export class EditRequestModalComponent implements OnInit, OnDestroy {
  requestForm: FormGroup;
  error$: Observable<string>;
  requestChanged = false;
  subsription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public request: RequestModel,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.requestForm = new FormGroup({
      description: new FormControl(
        this.request.description,
        Validators.required
      ),
      quantity: new FormControl(this.request.quantity, Validators.required),
      budget: new FormControl(this.request.budget, Validators.required),
    });

    this.error$ = this.store.pipe(select(selectError));

    this.subsription = this.requestForm.valueChanges.subscribe(() => {
      this.requestChanged = true;
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.requestForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.requestForm.valid) return;

    this.store.dispatch(RequestsActions.editRequest({ data: {...this.requestForm.value, id: this.request.id}}));
  }

  ngOnDestroy() {
    if (this.subsription) this.subsription.unsubscribe();
  }
}

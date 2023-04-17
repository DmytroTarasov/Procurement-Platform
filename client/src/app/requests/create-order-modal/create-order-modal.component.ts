import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError } from '../store/requests.selectors';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import * as OrdersActions from 'src/app/orders/store/orders.actions';

@Component({
  selector: 'app-create-order-modal',
  templateUrl: './create-order-modal.component.html',
  styleUrls: ['./create-order-modal.component.scss']
})
export class CreateOrderModalComponent implements OnInit {
  orderForm: FormGroup;
  error$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      title: new FormControl('', Validators.required)
    });

    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.orderForm.get(controlName) as FormControl;
  }

  onSubmit() {
    if (!this.orderForm.valid) return;

    const { title } = this.orderForm.value;
    this.store.dispatch(OrdersActions.createOrder({ title }));
  }
}

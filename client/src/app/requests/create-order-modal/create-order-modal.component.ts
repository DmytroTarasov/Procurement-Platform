import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError } from '../store/requests.selectors';

import * as fromApp from 'src/app/store/app.reducer';
import * as RequestsActions from '../store/requests.actions';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { Address } from 'src/app/_models/address.model';
import { selectCompanyOrderAddresses } from 'src/app/orders/store/orders.selectors';
import { CreateOrder } from 'src/app/_models/create-order.model';

@Component({
  selector: 'app-create-order-modal',
  templateUrl: './create-order-modal.component.html',
  styleUrls: ['./create-order-modal.component.scss']
})
export class CreateOrderModalComponent implements OnInit {
  orderForm: FormGroup;
  error$: Observable<string>;
  addresses$: Observable<Address[]>;
  deliveryAddressExists = true;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(OrdersActions.getCompanyOrderAddresses());

    this.orderForm = new FormGroup({
      title: new FormControl('', Validators.required),
      deliveryAddressId: new FormControl('', this.deliveryAddressExists ? Validators.required : null),

      city: new FormControl('', !this.deliveryAddressExists ? Validators.required : null),
      region: new FormControl(''),
      street: new FormControl('', !this.deliveryAddressExists ? Validators.required : null),
      buildingNumber: new FormControl(''),
      zipCode: new FormControl('', !this.deliveryAddressExists ? Validators.required : null),
    });

    this.addresses$ = this.store.pipe(select(selectCompanyOrderAddresses));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.orderForm.get(controlName) as FormControl;
  }

  tranformAddress(address: Address) {
    const data = [address.city, address.street, address.zipCode];
    if (address.region) {
      data.splice(1, 0, `${address.region} область`);
    }
    if (address.buildingNumber) {
      data.splice(-1, 0, address.buildingNumber);
    }
    return data.join(', ');
  }

  toggleDeliveryAddressExistence() {
    this.deliveryAddressExists = !this.deliveryAddressExists;

    const controlsToUpdate = {
      deliveryAddressId: this.deliveryAddressExists ? [Validators.required] : [],
      city: this.deliveryAddressExists ? [] : [Validators.required],
      street: this.deliveryAddressExists ? [] : [Validators.required],
      zipCode: this.deliveryAddressExists ? [] : [Validators.required],
    };

    for (const controlName in controlsToUpdate) {
      const control = this.getFormControl(controlName);
      control.setValidators(controlsToUpdate[controlName]);
      control.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (!this.orderForm.valid) return;

    const { title, deliveryAddressId, ...address } = this.orderForm.value;
    const order: CreateOrder = { title, deliveryAddressId };
    order.deliveryAddressId = this.deliveryAddressExists ? order.deliveryAddressId : 0;
    order.deliveryAddress = !this.deliveryAddressExists ? address : null;

    this.store.dispatch(OrdersActions.createOrder({ order }));
  }
}

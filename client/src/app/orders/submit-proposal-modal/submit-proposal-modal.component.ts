import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { Address } from 'src/app/_models/address.model';
import { selectCompanyOrderAddresses, selectError } from 'src/app/orders/store/orders.selectors';
import { SubmitProposal } from 'src/app/_models/proposal.model';
import { User } from 'src/app/_models/user.model';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { Roles } from 'src/app/core/resources/roles';
import { CategoryTypes } from 'src/app/core/resources/category-types';
import {
  customPatternValidator,
  getCityValidators,
  getRegionValidators,
  getStreetValidators,
  getZipCodeValidators
} from 'src/app/core/resources/validators';

export interface SubmitProposalData {
  userRole: string;
  orderCategoryType: string;
  proposalId: number;
}

@Component({
  selector: 'app-submit-proposal-modal',
  templateUrl: './submit-proposal-modal.component.html',
  styleUrls: ['./submit-proposal-modal.component.scss']
})
export class SubmitProposalModalComponent implements OnInit {
  proposalForm: FormGroup;
  error$: Observable<string>;
  addresses$: Observable<Address[]>;
  user$: Observable<User>;
  shipmentAddressExists = true;
  Roles = Roles;
  CategoryTypes = CategoryTypes;

  constructor(private store: Store<fromApp.AppState>, @Inject(MAT_DIALOG_DATA) public data: SubmitProposalData) { }

  ngOnInit() {
    if (this.data.userRole === Roles.Supplier && !this.data.proposalId) {
      this.store.dispatch(OrdersActions.getCompanyOrderAddresses());
    }

    this.proposalForm = new FormGroup({
      shipmentAddressId: new FormControl(null, (this.shipmentAddressExists && this.data.userRole === Roles.Supplier &&
        !this.data.proposalId && CategoryTypes[this.data.orderCategoryType] === CategoryTypes.Goods) ? Validators.required : null),
      price: new FormControl('', [
        Validators.required,
        customPatternValidator('^\\d+(\\.\\d{1,2})?$', 'Ціна може бути лише цілим або десятковим числом')
      ]),
      additionalInfo: new FormControl(null),
      city: new FormControl('', !this.shipmentAddressExists ? getCityValidators() : null),
      region: new FormControl(null, !this.shipmentAddressExists ? getRegionValidators() : null),
      street: new FormControl('', !this.shipmentAddressExists ? getStreetValidators() : null),
      buildingNumber: new FormControl(null, Validators.maxLength(5)),
      zipCode: new FormControl('', !this.shipmentAddressExists ? getZipCodeValidators() : null)
    });

    this.addresses$ = this.store.pipe(select(selectCompanyOrderAddresses));
    this.user$ = this.store.pipe(select(selectUser));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.proposalForm.get(controlName) as FormControl;
  }

  get label() {
    return (this.data.userRole === Roles.Supplier && !this.data.proposalId) ? 'Ціна (грн.)' : 'Ціна за доставку (грн.)';
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

  toggleShipmentAddressExistence() {
    this.shipmentAddressExists = !this.shipmentAddressExists;

    const controlsToUpdate = {
      shipmentAddressId: this.shipmentAddressExists ? [Validators.required] : [],
      city: this.shipmentAddressExists ? [] : getCityValidators(),
      region: this.shipmentAddressExists ? [] : getRegionValidators(),
      street: this.shipmentAddressExists ? [] : getStreetValidators(),
      zipCode: this.shipmentAddressExists ? [] : getZipCodeValidators()
    };

    for (const controlName in controlsToUpdate) {
      const control = this.getFormControl(controlName);
      control.setValidators(controlsToUpdate[controlName]);
      control.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (!this.proposalForm.valid) return;

    const { shipmentAddressId, price, additionalInfo, ...address } = this.proposalForm.value;

    let proposal: SubmitProposal;
    if (this.data.userRole === Roles.Supplier && !this.data.proposalId) {
      proposal = { shipmentAddressId, supplierPrice: price, supplierAdditionalInfo: additionalInfo };
      proposal.shipmentAddress = !this.shipmentAddressExists ? address : null;
    } else {
      proposal = { proposalId: this.data.proposalId, transporterSum: price, transporterAdditionalInfo: additionalInfo };
    }

    this.store.dispatch(OrdersActions.submitProposal({ proposal }));
  }
}

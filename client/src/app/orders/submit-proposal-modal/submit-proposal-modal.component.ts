import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from 'src/app/orders/store/orders.actions';
import { Address } from 'src/app/_models/address.model';
import { selectCompanyOrderAddresses } from 'src/app/orders/store/orders.selectors';
import { selectError } from 'src/app/orders/store/orders.selectors';
import { CreateProposal } from 'src/app/_models/proposal.model';

@Component({
  selector: 'app-submit-proposal-modal',
  templateUrl: './submit-proposal-modal.component.html',
  styleUrls: ['./submit-proposal-modal.component.scss']
})
export class SubmitProposalModalComponent implements OnInit {
  proposalForm: FormGroup;
  error$: Observable<string>;
  addresses$: Observable<Address[]>;
  shipmentAddressExists = true;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(OrdersActions.getCompanyOrderAddresses());

    this.proposalForm = new FormGroup({
      shipmentAddressId: new FormControl('', this.shipmentAddressExists ? Validators.required : null),
      price: new FormControl('', Validators.required),
      additionalInfo: new FormControl(''),
      city: new FormControl('', !this.shipmentAddressExists ? Validators.required : null),
      region: new FormControl(''),
      street: new FormControl('', !this.shipmentAddressExists ? Validators.required : null),
      buildingNumber: new FormControl(''),
      zipCode: new FormControl('', !this.shipmentAddressExists ? Validators.required : null),
    });

    this.addresses$ = this.store.pipe(select(selectCompanyOrderAddresses));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(controlName: string): FormControl {
    return this.proposalForm.get(controlName) as FormControl;
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
      city: this.shipmentAddressExists ? [] : [Validators.required],
      street: this.shipmentAddressExists ? [] : [Validators.required],
      zipCode: this.shipmentAddressExists ? [] : [Validators.required],
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
    const proposal: CreateProposal = { shipmentAddressId, supplierPrice: price, supplierAdditionalInfo: additionalInfo };
    proposal.shipmentAddressId = !!proposal.shipmentAddressId ? proposal.shipmentAddressId : null;
    // proposal.shipmentAddressId = this.shipmentAddressExists ? proposal.shipmentAddressId : 0;
    proposal.shipmentAddress = !this.shipmentAddressExists ? address : null;

    this.store.dispatch(OrdersActions.submitProposal({ proposal }));
  }
}

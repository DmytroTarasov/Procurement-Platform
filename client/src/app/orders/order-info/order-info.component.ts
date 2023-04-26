import { Component, Input } from '@angular/core';
import { Address } from 'src/app/_models/address.model';
import { ContactPerson } from 'src/app/_models/order.model';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent {
  // @Input() label?: string;
  @Input() person: ContactPerson;
  @Input() shipmentAddress?: Address;
  @Input() additionalInfo?: string;
  @Input() price?: number;
  @Input() showCompanyAddress = false;
  @Input() tranformCompanyAddress: (address: Address) => string;
  @Input() getFullName: (person: ContactPerson) => string;
}

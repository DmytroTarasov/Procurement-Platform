import { Address } from "./address.model";
import { ContactPerson } from "./order.model";

export interface CreateProposal {
  proposalId?: number;
  orderId?: number;
  supplierId?: number;
  transporterId?: number;
  supplierPrice?: number;
  supplierAdditionalInfo?: string;
  transporterSum?: number;
  transporterAdditionalInfo?: string;
  shipmentAddressId?: number;
  shipmentAddress?: Address;
}

export interface Proposal {
  id?: number;
  supplierContactPerson: ContactPerson;
  transporterContactPerson: ContactPerson;
  supplierPrice: number;
  supplierAdditionalInfo?: string;
  transporterSum?: number;
  transporterAdditionalInfo?: number;
  shipmentAddress: Address;
  status: string;
}

import { Address } from "./address.model";

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

import { Address } from "./address.model";
import { Proposal } from "./proposal.model";

export interface Order {
  id?: number;
  title: string;
  createdAt: Date;
  budget: number;
  buyerContactPerson: ContactPerson;
  supplierContactPerson: ContactPerson;
  transporterContactPerson: ContactPerson;
  requests: OrderRequest[];
  proposals: Proposal[];
  categoryType: string;
  status: string;
  deliveryAddress: Address;
  shipmentAddress: Address;
  supplierPrice?: number;
  transporterSum?: number;
}

export interface OrderRequest {
  id?: number;
  description: string;
  subdivisionTitle: string;
  procurementItemTitle: string;
  measurementUnit: string;
  quantity: number;
}

export interface ContactPerson {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  companyId: number;
  companyTitle: string;
  companyEdrpou: string;
  companyAddress: Address;
}

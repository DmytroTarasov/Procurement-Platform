import { Address } from "./address.model";

export interface Order {
  id?: number;
  title: string;
  createdAt: Date;
  budget: number;
  buyerContactPerson: BuyerContactPerson;
  // buyerCompanyName: string;
  status: string;
  deliveryAddress: Address;
  shipmentAddress: Address;
  requests: OrderRequest[];
}

export interface OrderRequest {
  id?: number;
  description: string;
  subdivisionTitle: string;
  procurementItemTitle: string;
  measurementUnit: string;
  quantity: number;
}

export interface BuyerContactPerson {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  companyName: string;
  companyEdrpou: string;
  companyAddress: Address;
}

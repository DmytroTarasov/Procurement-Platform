import { Address } from "./address.model";

export interface CreateOrder {
  title: string;
  requestIds?: number[];
  deliveryAddressId?: number;
  deliveryAddress?: Address;
}

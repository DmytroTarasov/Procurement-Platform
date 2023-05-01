import { Address } from "./address.model";
import { Subdivision } from "./subdivision.model";

export interface Company {
  id?: number;
  title: string;
  edrpou: number;
  email: string;
  address: Address;
  subdivisions?: Subdivision[]
}

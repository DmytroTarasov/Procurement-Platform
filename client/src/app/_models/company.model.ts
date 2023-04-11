import { Subdivision } from "./subdivision.model";

export interface Company {
  id?: number;
  title: string;
  edrpou: number;
  city: string;
  street: string;
  apartment?: string;
  zipCode: string;
  subdivisions?: Subdivision[]
}

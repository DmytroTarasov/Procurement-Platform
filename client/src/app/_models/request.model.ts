import { ProcurementItem } from "./procurement-item.model";
import { Subdivision } from "./subdivision.model";

export interface RequestModel {
  id?: number;
  description: string;
  createdAt: Date;
  subdivision: Subdivision;
  procurementItem: ProcurementItem;
  procurementItemId?: number;
  quantity: number;
  measurementUnit: string;
  budget: number;
  status: string;
  orderId?: number;
}

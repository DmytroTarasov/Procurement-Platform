import { Good } from "./good.model";
import { Subdivision } from "./subdivision.model";

export interface RequestModel {
  id?: number;
  description: string;
  createdAt: Date;
  subdivision: Subdivision;
  good: Good;
  goodId?: number;
  quantity: number;
  measurementUnit: string;
  budget: number;
  status: string;
  orderId?: number;
}

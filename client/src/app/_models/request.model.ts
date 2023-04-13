export interface RequestModel {
  id?: number;
  description: string;
  createdAt: Date;
  subdivisionId: number;
  goodId?: number;
  quantity: number;
  measurementUnit: string;
  budget: number;
  orderId?: number;
}

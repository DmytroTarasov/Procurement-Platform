export interface Order {
  id?: number;
  title: string;
  createdAt: Date;
  budget: number;
  status: string;
  requests: OrderRequest[];
}

export interface OrderRequest {
  id?: number;
  description: string;
  subdivisionTitle: string;
  goodTitle: string;
  measurementUnit: string;
  quantity: number;
}

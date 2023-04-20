export interface Order {
  id?: number;
  title: string;
  createdAt: Date;
  budget: number;
  buyerContactPerson: BuyerContactPerson;
  // buyerCompanyName: string;
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

export interface BuyerContactPerson {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  companyName: string;
}

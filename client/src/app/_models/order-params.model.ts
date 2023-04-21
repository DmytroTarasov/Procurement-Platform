export class OrderParams {
  status: string;
  companyOrders: boolean;

  constructor(status = '', companyOrders = false) {
    this.status = status;
    this.companyOrders = companyOrders;
  }
}

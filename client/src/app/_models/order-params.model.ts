export class OrderParams {
  status: string;

  constructor(status = '') {
    this.status = status;
  }
}

export class RequestParams {
  status: string;
  categoryTitle: string;
  procurementItemTitle: string;

  constructor(status = '', categoryTitle = '', procurementItemTitle = '') {
    this.status = status;
    this.categoryTitle = categoryTitle;
    this.procurementItemTitle = procurementItemTitle;
  }
}

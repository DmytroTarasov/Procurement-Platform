export class RequestParams {
  status: string;
  categoryTitle: string;
  goodTitle: string;

  constructor(status = '', categoryTitle = '', goodTitle = '') {
    this.status = status;
    this.categoryTitle = categoryTitle;
    this.goodTitle = goodTitle;
  }
}

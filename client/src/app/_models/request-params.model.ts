export class RequestParams {
  status: string;
  goodTitle: string;

  constructor(status = '', goodTitle = '') {
    this.status = status;
    this.goodTitle = goodTitle;
  }
}

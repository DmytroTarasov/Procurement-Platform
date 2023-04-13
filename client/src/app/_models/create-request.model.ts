import { Good } from "./good.model";
import { RequestModel } from "./request.model";

export interface CreateRequest {
  request: RequestModel;
  good?: Good;
}

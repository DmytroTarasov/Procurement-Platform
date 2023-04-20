import { ProcurementItem } from "./procurement-item.model";
import { RequestModel } from "./request.model";

export interface CreateRequest {
  request: RequestModel;
  procurementItem?: ProcurementItem;
}

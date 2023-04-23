import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Pagination } from 'src/app/_models/pagination.model';
import { Order } from 'src/app/_models/order.model';
import { OrderParams } from 'src/app/_models/order-params.model';
import { Address } from 'src/app/_models/address.model';

export interface State {
  orders: Order[] | null;
  pagination: Pagination;
  orderParams: OrderParams;
  selectedOrder: Order | null;
  addresses: Address[] | null;
  error: string | null;
}

export const initialState: State = {
  orders: null,
  pagination: null,
  orderParams: new OrderParams(),
  selectedOrder: null,
  addresses: null,
  error: null
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.setOrders, (state, { orders, pagination }) => ({ ...state, orders: [...orders],
    pagination: {...pagination}, selectedOrder: null })),
  on(OrdersActions.setOrderParams, (state, { orderParams }) => ({ ...state, orderParams: {...orderParams} })),
  on(OrdersActions.clearState, (state) => ({ ...initialState })),
  on(OrdersActions.setSelectedOrder, (state, { order }) => ({ ...state, selectedOrder: {...order} })),
  on(OrdersActions.setCompanyOrderAddresses, (state, { addresses }) => ({ ...state, addresses: [...addresses] })),
  // on(OrdersActions.cancelProposalSuccess, (state, { id }) => {
  //   const proposalToUpdate = state.selectedOrder.proposals.find(p => p.id === id);
  //   const updatedProposal = { ...proposalToUpdate, status: 'Cancelled' };
  //   const updatedProposalIndex = state.selectedOrder.proposals.indexOf(proposalToUpdate);
  //   const updatedProposals = [
  //     ...state.selectedOrder.proposals.slice(0, updatedProposalIndex),
  //     updatedProposal,
  //     ...state.selectedOrder.proposals.slice(updatedProposalIndex + 1)
  //   ]
  //   return {
  //     ...state,
  //     selectedOrder: { ...state.selectedOrder, proposals: updatedProposals }
  //   };
  // }),
  on(OrdersActions.failure, (state, { error }) => ({ ...state, error })),
);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersListItemComponent } from './orders-list-item/orders-list-item.component';
import { OrdersActionsComponent } from './orders-actions/orders-actions.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderGuard } from '../_guards/order.guard';
import { SubmitProposalModalComponent } from './submit-proposal-modal/submit-proposal-modal.component';

@NgModule({
  declarations: [
    OrdersContainerComponent,
    OrdersListComponent,
    OrdersListItemComponent,
    OrdersActionsComponent,
    OrderDetailsComponent,
    SubmitProposalModalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OrdersContainerComponent },
      { path: ':orderId', component: OrderDetailsComponent }
    ])
  ]
})
export class OrdersModule { }

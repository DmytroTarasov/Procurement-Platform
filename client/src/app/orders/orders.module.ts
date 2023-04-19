import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersListItemComponent } from './orders-list-item/orders-list-item.component';

@NgModule({
  declarations: [
    OrdersContainerComponent,
    OrdersListComponent,
    OrdersListItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OrdersContainerComponent },
    ])
  ]
})
export class OrdersModule { }
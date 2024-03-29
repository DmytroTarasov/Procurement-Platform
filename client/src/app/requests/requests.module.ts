import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RequestsContainerComponent } from './requests-container/requests-container.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';
import { RequestsListItemComponent } from './requests-list-item/requests-list-item.component';
import { EditRequestModalComponent } from './edit-request-modal/edit-request-modal.component';
import { RequestsActionsComponent } from './requests-actions/requests-actions.component';
import { CreateOrderModalComponent } from './create-order-modal/create-order-modal.component';

@NgModule({
  declarations: [
    RequestsContainerComponent,
    RequestsListComponent,
    CreateRequestModalComponent,
    RequestsListItemComponent,
    EditRequestModalComponent,
    RequestsActionsComponent,
    CreateOrderModalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RequestsContainerComponent },
    ])
  ]
})
export class RequestsModule { }

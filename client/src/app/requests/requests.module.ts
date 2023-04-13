import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RequestsContainerComponent } from './requests-container/requests-container.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';

@NgModule({
  declarations: [
    RequestsContainerComponent,
    RequestsListComponent,
    CreateRequestModalComponent
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

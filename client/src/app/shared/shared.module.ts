import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './_forms/input/input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button/button.component';
import { ModalContainerComponent } from './_modals/modal-container/modal-container.component';
import { ModalActionsContainerComponent } from './_modals/modal-actions-container/modal-actions-container.component';
import { ModalResultComponent } from './_modals/modal-result/modal-result.component';
import { ModalRedirectComponent } from './_modals/modal-redirect/modal-redirect.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    ModalContainerComponent,
    ModalActionsContainerComponent,
    ModalResultComponent,
    ModalRedirectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    ModalContainerComponent,
    ModalActionsContainerComponent,
    ModalResultComponent,
    ModalRedirectComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class SharedModule { }

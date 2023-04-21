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
import { ModalRedirectComponent } from './_modals/modal-redirect/modal-redirect.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { TextareaComponent } from './_forms/textarea/textarea.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    ModalContainerComponent,
    ModalRedirectComponent,
    HeaderComponent,
    TextareaComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  exports: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    ModalContainerComponent,
    ModalRedirectComponent,
    HeaderComponent,
    TextareaComponent,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }

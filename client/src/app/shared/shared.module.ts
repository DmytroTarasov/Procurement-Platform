import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './_forms/input/input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    InputComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    InputComponent,
    DropdownComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ]
})
export class SharedModule { }

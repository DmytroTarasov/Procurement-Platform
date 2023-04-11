import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: 'register', component: RegistrationComponent }])
  ]
})
export class AuthModule { }

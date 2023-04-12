import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreateCompanyModalComponent } from './create-company-modal/create-company-modal.component';
import { CreateSubdivisionModalComponent } from './create-subdivision-modal/create-subdivision-modal.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    CreateCompanyModalComponent,
    CreateSubdivisionModalComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ])
  ]
})
export class AuthModule { }

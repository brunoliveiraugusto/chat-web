import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { SignupComponent } from './sign-up/signup.component';
import { SigninComponent } from './sign-in/signin.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [SigninComponent, SignupComponent, RecoverPasswordComponent],
  exports: [SigninComponent, SignupComponent, RecoverPasswordComponent],
  imports: [ReactiveFormsModule, RouterModule, SharedModule, CommonModule, UserRoutingModule]
})
export class UserModule {

}

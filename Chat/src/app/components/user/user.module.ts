import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { SignupComponent } from './sign-up/signup.component';
import { SigninComponent } from './sign-in/signin.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  exports: [SigninComponent, SignupComponent],
  imports: [ReactiveFormsModule, RouterModule]
})
export class UserModule {

}

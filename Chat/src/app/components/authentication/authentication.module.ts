import { NgModule } from "@angular/core";

import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, RegisterUserComponent],
  exports: [LoginComponent, RegisterUserComponent],
  imports: []
})
export class AuthenticationModule {

}

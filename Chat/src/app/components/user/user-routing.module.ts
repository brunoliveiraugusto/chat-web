import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecoverPasswordComponent } from "./recover-password/recover-password.component";
import { SigninComponent } from "./sign-in/signin.component";
import { SignupComponent } from "./sign-up/signup.component";

const routes: Routes = [

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

}

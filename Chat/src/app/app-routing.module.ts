import { RecoverPasswordComponent } from './components/user/recover-password/recover-password.component';
import { SignupComponent } from './components/user/sign-up/signup.component';
import { SigninComponent } from './components/user/sign-in/signin.component';
import { AuthGuard } from './components/core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'messages',
    component: ChatComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'password/:token',
    component: RecoverPasswordComponent
  },
  {
    path: '**',
    component: SigninComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

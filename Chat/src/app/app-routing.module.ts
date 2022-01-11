import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './components/core/guards/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { SigninComponent } from './components/user/sign-in/signin.component';
import { SignupComponent } from './components/user/sign-up/signup.component';
import { RecoverPasswordComponent } from './components/user/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: 'messages',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'password/:token',
    component: RecoverPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'messages',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

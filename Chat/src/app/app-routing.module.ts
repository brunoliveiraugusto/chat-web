import { SignupComponent } from './components/authentication/sign-up/signup.component';
import { SigninComponent } from './components/authentication/sign-in/signin.component';
import { AuthGuard } from './components/core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'messages',
    component: ChatComponent,
    // canActivate: [AuthGuard]
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

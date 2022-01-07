import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './components/chat/chat.module';
import { UserModule } from './components/user/user.module';
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidationMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

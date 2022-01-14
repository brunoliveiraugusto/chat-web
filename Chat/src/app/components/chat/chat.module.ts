import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ChatComponent } from './chat.component';
import { MessageSummaryModule } from './message-summary/message-summary.module';
import { MessageModule } from "./message/message.module";
import { NewMessageModule } from './new-message/new-message.module';

@NgModule({
  declarations: [ChatComponent],
  exports: [ChatComponent],
  imports: [BrowserModule, MessageSummaryModule, MessageModule, ReactiveFormsModule, NewMessageModule]
})
export class ChatModule {

}

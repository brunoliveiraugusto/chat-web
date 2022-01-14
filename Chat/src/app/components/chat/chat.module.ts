import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ChatComponent } from './chat.component';
import { MessageSummaryModule } from './message-summary/message-summary.module';
import { MessageModule } from "./message/message.module";

@NgModule({
  declarations: [ChatComponent],
  exports: [ChatComponent],
  imports: [MessageSummaryModule, MessageModule, ReactiveFormsModule]
})
export class ChatModule {

}

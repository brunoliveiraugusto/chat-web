import { NgModule } from "@angular/core";

import { ChatComponent } from './chat.component';
import { MessageListModule } from './message-list/message-list.module';
import { MessageModule } from "./message/message.module";

@NgModule({
  declarations: [ChatComponent],
  exports: [ChatComponent],
  imports: [MessageListModule, MessageModule]
})
export class ChatModule {

}

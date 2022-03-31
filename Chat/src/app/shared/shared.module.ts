import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { NgModule } from "@angular/core";
import { MessageDatePipe } from './pipes/message-date.pipe';

@NgModule({
  declarations: [ValidationMessageComponent, MessageDatePipe],
  exports: [ValidationMessageComponent, MessageDatePipe],
  imports: []
})
export class SharedModule {

}

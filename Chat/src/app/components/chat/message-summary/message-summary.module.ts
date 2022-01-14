import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { MessageSummaryComponent } from './message-summary.component';

@NgModule({
  declarations: [MessageSummaryComponent],
  exports: [MessageSummaryComponent],
  imports: [BrowserModule]
})
export class MessageSummaryModule {

}

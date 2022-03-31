import { SharedModule } from './../../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { MessageComponent } from './message.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
  imports: [BrowserModule, ReactiveFormsModule, SharedModule]
})
export class MessageModule {

}

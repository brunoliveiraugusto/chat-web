import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { NewMessageComponent } from "./new-message.component";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewMessageComponent],
  exports: [NewMessageComponent],
  imports: [BrowserModule, ReactiveFormsModule]
})
export class NewMessageModule {

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

import { Message } from 'src/app/interfaces/message';
import { SignalrService } from './../../services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: Message;
  debounce: Subject<string> = new Subject<string>();
  searchGroup: FormGroup;

  constructor(private signalRService: SignalrService, private formBuilder: FormBuilder) {
    this.signalRService.createConnection();
    this.registerOnServerEvents();
    this.signalRService.starConnection();
  }

  ngOnInit(): void {
    this.searchGroup = this.formBuilder.group({
      'search': ['', []]
    });
  }

  private registerOnServerEvents() {
    this.signalRService.hubConnection.on("ReceiveMessage", (data: Message) => {
      console.log(data);
    });
  }

  search() {
    this.debounce
      .pipe(debounceTime(200))
      .subscribe(value => {

      });
  }

}

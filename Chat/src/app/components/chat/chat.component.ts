import { SignalrService } from './../../services/signalr.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: Message;

  constructor(private signalRService: SignalrService) {
    this.signalRService.createConnection();
    this.registerOnServerEvents();
    this.signalRService.starConnection();
  }

  ngOnInit(): void { }

  private registerOnServerEvents() {
    this.signalRService.hubConnection.on("ReceiveMessage", (data: Message) => {
      console.log(data);
    });
  }

}

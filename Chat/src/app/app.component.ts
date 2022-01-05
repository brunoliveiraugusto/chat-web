import { Component } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from './interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private hubConnection: HubConnection;
  message: Message;

  constructor() {
    // this.createConnection();
    // this.registerOnServerEvents();
    // this.starConnection();
  }

  connectToStock(symbol: string) {
    this.hubConnection.invoke("SendMessage", symbol);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:31146/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  }

  private starConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
      })
      .catch(() => {
        console.log("Error while establishing a connection");
      });
  }

  private registerOnServerEvents() {
    this.hubConnection.on("ReceiveMessage", (data: Message) => {
      console.log(data);
    });
  }
}

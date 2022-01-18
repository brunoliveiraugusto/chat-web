import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubConnection: HubConnection;

  constructor() { }

  connectToStock(symbol: string) {
    this.hubConnection.invoke("SendMessage", symbol);
  }

  createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://192.168.0.12:3000/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  }

  starConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
      })
      .catch(() => {
        console.log("Error while establishing a connection");
      });
  }
}

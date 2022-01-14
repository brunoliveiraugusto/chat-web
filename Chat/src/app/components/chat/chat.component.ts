import { UserService } from './../user/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

import { Message } from 'src/app/interfaces/message';
import { MessageSummary } from 'src/app/interfaces/message-summary';
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
  messagesSummary: Array<MessageSummary> =
  [
    {
      from: 'Geovanna',
      message: 'Vc deixou o dinheiro pra eu pagar as roupas?',
      sendDate: new Date(),
      src: ''
    },
    {
      from: 'Izaque',
      message: 'o mecânico colocou um filtro novo e trocou o óleo da moto?',
      sendDate: new Date(),
      src: ''
    }
  ]

  constructor(private signalRService: SignalrService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
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
      //Adiciono a mensagem no array de resumo de mensagens
      //Se já houver mensagem do remetente, apenos atualizo a última mensagem e a data de envio
      console.log(data);
    });
  }

  search() {
    this.debounce
      .pipe(debounceTime(200))
      .subscribe(value => {

      });
  }

  openMessage() {
    this.router.navigate(['message', '']);
  }

  newMessage() {
    this.router.navigate(['new-message']);
  }
}

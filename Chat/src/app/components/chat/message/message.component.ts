import { MessageSummary } from 'src/app/interfaces/message-summary';
import { SignalrService } from './../../../services/signalr.service';
import { MessagePagination } from './../../../interfaces/message-pagination';
import { UserService } from './../../user/services/user.service';
import { Message } from 'src/app/interfaces/message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { interval, pipe } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageGroup: FormGroup;
  recipient: string;
  fullName: string;
  limit: number = 15;
  skip: number = 0;
  paginationMessages: MessagePagination = { totalMessages: 0, messages: [] };

  constructor(
      activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private messageService: MessageService,
      private userService: UserService,
      private signalRService: SignalrService
    ) {
    this.recipient = activatedRoute.snapshot.paramMap.get('username');
    this.fullName = activatedRoute.snapshot.paramMap.get('fullname');
    this.signalRService.createConnection();
    this.registerOnServerEvents();
    this.signalRService.starConnection();
  }

  ngOnInit() {
    this.messageGroup = this.formBuilder.group({
      'message': ['', []]
    });

    this.messagePagination();
  }

  navigateTo() {
    this.router.navigate(['']);
  }

  sendMessage() {
    const text = this.messageGroup.getRawValue().message as string;

    if(!text) {
      return;
    }

    this.messageGroup.reset();

    let message: Message = {
      sender: this.userService.getUsername(),
      sendDate: new Date(),
      messageSent: text,
      recipient: this.recipient
    }

    this.paginationMessages.messages.push(message);

    this.messageService.post('', message).subscribe(_ => {}, err => {
      alert('Não foi possível enviar sua mensagem, tente novamente.');
    });
  }

  messagePagination() {
    const idUserLogged = this.userService.getIdUser();

    if(this.paginationMessages.totalMessages < this.paginationMessages.messages.length)
      this.skip += this.limit;

    this.messageService.get(`message-pagination/${idUserLogged}/${this.recipient}/${this.limit}/${this.skip}`).subscribe(
      res => {
        this.paginationMessages.messages.push(...res.data.messages);
        this.scrollToBottom();
      },
      _ => {}
    );
  }

  private registerOnServerEvents() {
    this.signalRService.hubConnection.on(this.userService.getUsername(), (data: MessageSummary) => {
      this.addMessage(data);
    });
  }

  private addMessage(messageSummary: MessageSummary) {
    let message: Message = {
      messageSent: messageSummary.messageSent,
      recipient: messageSummary.recipient,
      sendDate: messageSummary.sendDate,
      sender: messageSummary.sender,
      isRecipient: true
    };

    this.paginationMessages.messages.push(message);
  }

  scrollToBottom() {

  }
}

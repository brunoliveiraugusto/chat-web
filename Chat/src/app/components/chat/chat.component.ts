import { TokenService } from './../core/services/token.service';
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
  messagesSummary: Array<MessageSummary> = new Array<MessageSummary>();

  constructor(private signalRService: SignalrService, private formBuilder: FormBuilder, private router: Router, private userService: UserService, private tokenService: TokenService) {
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
    this.signalRService.hubConnection.on(this.userService.getUsername(), (data: MessageSummary) => {
      this.addMessage(data);
    });
  }

  search() {
    this.debounce
      .pipe(debounceTime(200))
      .subscribe(value => {

      });
  }

  openMessage(messageSummary: MessageSummary) {
    this.router.navigate(['message', messageSummary.from, messageSummary.fullname]);
  }

  newMessage() {
    this.router.navigate(['new-message']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['signin']);
  }

  addMessage(data: MessageSummary) {
    let index = this.messagesSummary.findIndex(message => message.from == data.from);
    if(index > -1) {
      this.messagesSummary[index].text = data.text;
      this.messagesSummary[index].sendDate = data.sendDate;
    }
    else {
      this.messagesSummary.push(data);
    }
  }
}

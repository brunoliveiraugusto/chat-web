import { UserService } from './../../user/services/user.service';
import { Message } from 'src/app/interfaces/message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './services/message.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageGroup: FormGroup;
  userName: string;
  fullName: string;

  constructor(
      activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private messageService: MessageService,
      private userService: UserService
    ) {
    this.userName = activatedRoute.snapshot.paramMap.get('username');
    this.fullName = activatedRoute.snapshot.paramMap.get('fullname');
  }

  ngOnInit() {
    this.messageGroup = this.formBuilder.group({
      'message': ['', []]
    });
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
      recipient: this.userName
    }

    this.messageService.post('', message).subscribe(_ => {}, err => {
      alert('Não foi possível enviar sua mensagem, tente novamente.');
    });
  }
}

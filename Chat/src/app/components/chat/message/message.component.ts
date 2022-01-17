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
  username: string;
  fullname: string;

  constructor(
      activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private messageService: MessageService,
      private userService: UserService
    ) {
    this.username = activatedRoute.snapshot.paramMap.get('username');
    this.fullname = activatedRoute.snapshot.paramMap.get('fullname');
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
      from: this.userService.getUsername(),
      sendDate: new Date(),
      text: text,
      to: this.username
    }

    this.messageService.post('', message).subscribe(_ => {}, err => {
      alert('Não foi possível enviar sua mensagem, tente novamente.');
    });
  }
}

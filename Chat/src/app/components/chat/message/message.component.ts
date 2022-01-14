import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  username: string;

  constructor(activatedRoute: ActivatedRoute) {
    this.username = activatedRoute.snapshot.paramMap.get('user');
  }

  ngOnInit() {
  }

}

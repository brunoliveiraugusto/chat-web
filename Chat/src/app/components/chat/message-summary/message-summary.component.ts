import { MessageSummary } from './../../../interfaces/message-summary';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'message-summary',
  templateUrl: './message-summary.component.html',
  styleUrls: ['./message-summary.component.css']
})
export class MessageSummaryComponent implements OnInit {

  @Input() summary: MessageSummary;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}

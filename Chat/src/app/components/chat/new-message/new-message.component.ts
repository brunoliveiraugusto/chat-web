import { SearchedUser } from './../../../interfaces/searched-user';
import { UserService } from './../../user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ResponseBase } from 'src/app/shared/models/response-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  searchGroup: FormGroup;
  debounce: Subject<string> = new Subject<string>();
  user$: Observable<ResponseBase<SearchedUser>>;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.searchGroup = this.formBuilder.group({
      'search': ['', []]
    });

    this.searchUser();
  }

  searchUser() {
    this.debounce
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.user$ = this.userService.get(`search-user/${value}`);
      });
  }

  newMessage(user: SearchedUser) {
    this.router.navigate(['message', user.username, user.fullname]);
  }
}

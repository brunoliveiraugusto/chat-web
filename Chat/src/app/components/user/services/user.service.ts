import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as jtw_decode from 'jwt-decode';

import { BaseHttpService } from 'src/app/services/base-http.service';
import { UserLogged } from '../../core/interfaces/user-logged';
import { TokenService } from './../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<any> {

  private userSubject = new Subject<UserLogged>();
  private username: string;

  constructor(http: HttpClient, private tokenService: TokenService) {
    super(http, 'user');
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jtw_decode(token) as UserLogged;
    this.username = user.username;
    this.userSubject.next(user);
  }

  getUsername(): string {
    return this.username;
  }
}

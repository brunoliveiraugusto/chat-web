import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<any> {

  constructor(http: HttpClient) {
    super(http, 'user');
  }
}

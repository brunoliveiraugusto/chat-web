import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService<any> {

  constructor(http: HttpClient, private tokenService: TokenService) {
    super(http, 'auth');
  }

  public post(action: string = '', body: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/${this.resource}/${action}`, body, { observe: 'response'} )
      .pipe(tap(res => {
        const token = res.headers.get('x-access-token');
        this.tokenService.setToken(token);
      }));
  }
}

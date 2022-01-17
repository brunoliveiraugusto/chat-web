import { TokenService } from './../services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.tokenService.hasToken()) {

        const token = this.tokenService.getToken();
        req = req.clone({
          setHeaders: {
              'Authorization': 'Bearer '.concat(token),
              'content-type': 'application/json'
          }
      });
    }

    return next.handle(req);
  }
}

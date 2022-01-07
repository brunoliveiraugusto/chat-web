import { ResponseBase } from './../shared/models/response-base';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {

  protected _http: HttpClient;
  protected resource: string;
  protected baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, resource: string) {
    this._http = http;
    this.resource = resource;
  }

  public get(action: string): Observable<ResponseBase<T>> {
    return this._http.get<ResponseBase<T>>(`${this.baseUrl}/${this.resource}/${action}`);
  }

  public getById(action: string = '', id: string): Observable<ResponseBase<T>> {
    return this._http.get<ResponseBase<T>>(`${this.baseUrl}/${this.resource}/${action}${id}`);
  }

  public getAll(action: string = ''): Observable<ResponseBase<Array<T>>> {
    return this._http.get<ResponseBase<Array<T>>>(`${this.baseUrl}/${this.resource}/${action}`);
  }

  public post(action: string = '', body: any): Observable<ResponseBase<any>> {
    return this._http.post<ResponseBase<any>>(`${this.baseUrl}/${this.resource}/${action}`, body);
  }

  public put(action: string = '', body: any, id: string): Observable<ResponseBase<any>> {
    return this._http.put<ResponseBase<any>>(`${this.baseUrl}/${this.resource}/${action}${id}`, body);
  }

  public delete(action: string = '', id: string): Observable<ResponseBase<any>> {
    return this._http.delete<ResponseBase<any>>(`${this.baseUrl}/${this.resource}/${action}${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public url: string;

  constructor(
      public _http: HttpClient
  ) {
      this.url = GLOBAL.url;
  }

  signup(user, gettoken = null): Observable<any> {
      if (gettoken) {
        user.gettoken = 'true';
      }
      const json = JSON.stringify(user);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(`${this.url}login`, params, {headers: headers});
  }

  create(token, user: User): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);
    return this._http.post(`${this.url}register`, params, {headers: headers});
  }

  update(token, user: User, id): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);
    return this._http.put(`${this.url}user/${id}`, params, {headers: headers});
  }

  getUsuarios(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(`${this.url}user`, {headers: headers});
  }

  getUsuario(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(`${this.url}user/${id}`, {headers: headers});
  }
}

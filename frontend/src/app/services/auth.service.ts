import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  jwtHelper: JwtHelper = new JwtHelper();

  loginSubject = new BehaviorSubject<any>(null);

  login(username, password) {
    return this.http.post('api/login', { username: username, password: password });
  }

  register(username, password) {
    return this.http.post('api/register', { username: username, password: password });
  }

  storeToken(data): Observable<void> {
    localStorage.setItem('jwt', data.token);
    return of(null);
  }

  getToken() {
    localStorage.getItem('jwt');
  }

  getLoggedInUser(): string {

    if (this.isLoggedIn()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).data.username;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    // check if token is expired here!
    return localStorage.getItem('jwt') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('jwt'));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt/';
// import { JwtHelper } from 'angular-jwt';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  jwtHelper: JwtHelperService = new JwtHelperService();

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

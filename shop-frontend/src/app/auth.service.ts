import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, shareReplay, tap } from 'rxjs/operators';
import { User } from 'src/types';
import * as moment from 'moment';

const apiURL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string) {
    return this.http
      .post<User>(`${apiURL}/auth/login/`, { username, password })
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay(1)
      );
  }

  refresh() {
    return this.http
      .post<User>(`${apiURL}/auth/refresh/`, {
        username: this.getUsername(),
        token: localStorage.getItem('id_token'),
      })
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay(1)
      );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('username', authResult.username);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public getUsername() {
    return localStorage.getItem('username');
  }

  public isLoggedIn() {
    const notExpired = moment().isBefore(this.getExpiration());
    return notExpired;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  constructor(private http: HttpClient) {}
}

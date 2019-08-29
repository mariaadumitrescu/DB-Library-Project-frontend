import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../models/user';
import {environment} from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;



  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : "";
  }



  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { email, password })
      .pipe(map(token => {
        localStorage.setItem('currentUser', JSON.stringify(token));
        localStorage.setItem('email', email);
        this.currentUserSubject.next(token);
        return token;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

}

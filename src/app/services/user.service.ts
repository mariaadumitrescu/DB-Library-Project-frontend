import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {Registration} from '../models/registration';
import {AuthenticationService} from './autentication.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>('http://localhost:8080/findUserByEmail', {
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params:{email: email}})
      .pipe(map(obj => {
        localStorage.setItem('isEnabled',obj.enabled);
        localStorage.setItem('role',obj.roles[0].name);
        return obj;
      }));
  }

  returnUserByEmail(email: string){
    return this.http.get<any>('http://localhost:8080/findUserByEmail', {
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params:{email: email}}) as Observable<User>
  }

  registerUser(registration: Registration) {
    return this.http.post('http://localhost:8080/register', registration, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }


}

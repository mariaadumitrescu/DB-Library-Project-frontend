import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {Registration} from '../models/registration';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  registerUser(registration: Registration){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/register', registration, {
      params: undefined,
      reportProgress: false,
      responseType: "json",
      withCredentials: false}) as Observable<any>;
  }



}

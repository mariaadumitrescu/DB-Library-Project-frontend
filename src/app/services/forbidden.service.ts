import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {

  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  resendVerification(email:string) {
    return this.http.post(`${environment.apiUrl}/resendVerificationLink`, email) as Observable<any>;
  }

}

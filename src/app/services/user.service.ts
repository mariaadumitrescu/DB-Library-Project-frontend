import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {Registration} from '../models/registration';
import {AuthenticationService} from './autentication.service';
import {map} from 'rxjs/operators';
import {ResponsePageList} from '../models/responsePageList';
import {FullUser} from '../models/fullUser';
import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>('http://localhost:8080/findUserByEmail', {
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params: {email: email}
    }) as Observable<any>
  }

  setLocalStorage(email: string) {
    return this.http.get<any>('http://localhost:8080/findUserByEmail', {
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params: {email: email}
    })
      .pipe(map(obj => {
        localStorage.setItem('isEnabled', obj.enabled);
        localStorage.setItem('role', obj.roles[0].name);
        return obj;
      }));
  }

  getPaginatedUsers(orderBy: string, direction: string, page: string, size: string, query: string) {
    return this.http.get('http://localhost:8080/paginatedUsers', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {
        orderBy: orderBy,
        direction: direction,
        page: page,
        size: size,
        query: query
      }
    }) as Observable<ResponsePageList<FullUser>>;
  }

  registerUser(registration: Registration) {
    return this.http.post('http://localhost:8080/register', registration, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

  updateUser(user: any) {
    return this.http.post('http://localhost:8080/updateUser', user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  clearPenalties(user: User){
    return this.http.post('http://localhost:8080/clearPenalties', user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  checkForPenalties(user: User) {
    return this.http.post('http://localhost:8080/checkForPenalties', user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;

  }
}

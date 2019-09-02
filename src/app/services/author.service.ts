import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './autentication.service';
import {Author} from '../models/author';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthorService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  addAuthors(authors: Author[]) {
    return this.http.post('http://localhost:8080/addAuthors', authors, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

  checkIfAuthorExist(query: string) {
    return this.http.get('http://localhost:8080/checkIfAuthorExist', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {query: query}
    }) as Observable<any>;
  }

  getAuthorByName(query: string) {
    return this.http.get('http://localhost:8080/getAuthorByName', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {query: query}
    }) as Observable<any>;
  }
}

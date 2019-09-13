import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './autentication.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAllRecommendedBooks() {
    return this.http.get('http://localhost:8080/preferences/books', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
     params:{}
    }) as Observable<Array<Book>>;
  }

}

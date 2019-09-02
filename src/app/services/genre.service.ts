import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Genre} from '../models/genre';
import {AuthenticationService} from './autentication.service';

@Injectable({ providedIn: 'root' })
export class GenreService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  addGenres(genres: Genre[]) {
    return this.http.post('http://localhost:8080/addGenres', genres, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

  checkIfGenreExist(query: string) {
    return this.http.get('http://localhost:8080/checkIfGenreExist', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {query: query}
    }) as Observable<any>;
  }

  getGenreByName(query: string) {
    return this.http.get('http://localhost:8080/getGenreByName', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {query: query}
    }) as Observable<any>;
  }

}

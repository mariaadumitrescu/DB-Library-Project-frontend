import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './autentication.service';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';
import { ResponsePageList } from '../models/responsePageList';

@Injectable({
  providedIn: 'root'
})
export class PreferredGenreService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }


  getAllGenres() {
    return this.http.get('http://localhost:8080/getGenresList', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<Genre[]>;
  }

  
  getGenreByName(name: string) {
    return this.http.get('http://localhost:8080/getGenreByName', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
     params:{
         name: name
     }
    }) as Observable<Genre>;
  }

  
  getPaginatedGenres(orderBy: string, direction: string, page: string, size: string, query: string) {
    return this.http.get('http://localhost:8080/findGenreByName', {
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
          params: {
            orderBy: orderBy,
            direction: direction,
            page: page,
            size: size,
            query: query
          }
        }) as Observable<ResponsePageList<Genre>>;
  }


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


  savePreferences(genres : Genre[]) {
    return this.http.post('http://localhost:8080/preferences', genres, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }



}

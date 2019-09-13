import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './autentication.service';

@Injectable({ providedIn: 'root' })
export class GenreService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getAllUnique() {
    return this.http.get('http://localhost:8080/getGenresList', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

}

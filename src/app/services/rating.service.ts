import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './autentication.service';
import {Observable} from 'rxjs';
import {Rating} from '../models/rating';

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  addRatings(rating: Rating, id:string) {
    return this.http.post('http://localhost:8080/addRating', rating, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.getToken()},
      params: {
        id: id
      }
    }) as Observable<any>;
  }

}

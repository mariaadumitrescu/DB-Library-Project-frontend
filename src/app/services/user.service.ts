import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  addNewUser(user: User) {
// @ts-ignore
    this.http.post('http://localhost:8080/registration', user).subscribe(response => console.log(response));

  }
}

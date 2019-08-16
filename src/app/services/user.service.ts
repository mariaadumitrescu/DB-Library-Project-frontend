import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../models/loginUser';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  addNewUser(user: User) {
// @ts-ignore
    this.http.post('http://localhost:8080/register', user).subscribe(response => console.log(response));

  }

  loginUser(user: LoginUser){
    this.http.post('http://localhost:8080/authenticate', user).subscribe( response => console.log(response));
  }
}

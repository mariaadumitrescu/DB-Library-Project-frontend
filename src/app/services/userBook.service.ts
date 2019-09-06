import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './autentication.service';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UserBook} from '../models/userBook';


@Injectable()
export class UserBookService{

  constructor(private http: HttpClient, private authenticationService: AuthenticationService){}

  addUserBook(user: User, book: Book, return_date: string) {

    let newuserbook = new UserBook(user, book, return_date, false);

    console.log(newuserbook);
    return this.http.post('http://localhost:8080/addUserBook', newuserbook, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  getBorrowedBooks(orderBy: string, direction: string, page: string, size: string, id: string){
    return this.http.get('http://localhost:8080/getBorrowedBooks', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params:{
        orderBy: orderBy,
        direction: direction,
        page: page,
        size: size,
        id: id
      }
    }) as Observable<any>;

  }

  returnBorrowBook(userBook: UserBook){
    return this.http.post('http://localhost:8080/returnBook', userBook,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      },
      params:{
        'id': userBook.id.toString()
      }
    }) as Observable<any>;

  }
}

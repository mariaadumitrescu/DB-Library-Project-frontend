import {Book} from './book';
import {User} from './user';
import {Observable} from 'rxjs';

export class UserBook{
  id: number;
  user: User;
  book: Book;
  return_date: string;

  constructor(user: User, book: Book, return_date: string){
    this.user = user;
    this.book = book;
    this.return_date = return_date;
  }

}
